require 'sinatra'
# Load application environment
require_relative 'config/environment'

configure :development do
  require 'sinatra/reloader'
  also_reload './**/*.rb'
end

configure do
  set :server, "thin"
  set :bind, "0.0.0.0"
  set :port, 4000

  set :api_proxy, ApiProxy.new(APP_CONFIG["backend"]["url"], APP_CONFIG["backend"]["token"])
  set :sse_broadcaster, SseBroadcaster.new
  set :scanned_code_processor, ScannedCodeProcessor.new(settings.api_proxy, settings.sse_broadcaster)
end

use Rack::Cors do
  allow do
    origins FRONTEND_URL
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options]
  end
end

set :public_folder, File.expand_path('public', __dir__)
set :static, true

# API endpoint for testing
get '/api/hello' do
  content_type :json
  settings.sse_broadcaster.broadcast({ message: "Hello from the backend!" })
  { message: "Hello Łordd" }.to_json
end

# SSE endpoint for frontend
get "/stream", provides: "text/event-stream" do
  response.headers['Content-Type'] = 'text/event-stream'
  response.headers['Cache-Control'] = 'no-cache'
  response.headers['Connection'] = 'keep-alive'

  stream(:keep_open) do |out|
    settings.sse_broadcaster.add_connection(out)

    out.callback do
      puts "SSE connection closed"
      settings.sse_broadcaster.remove_connection(out)
    end
    out.errback do
      puts "SSE connection error"
      settings.sse_broadcaster.remove_connection(out)
    end
  end
end

# Endpoint for hardware devices to send scanned codes
post '/process-scanned-code' do
  content_type :json

  result = settings.scanned_code_processor.process_request(request.body.read)

  if result[:status] == 200
    # settings.logger.info "/process-scanned-code, request payload: #{request.body}, status: 200"
    return { status: "success" }.to_json
  else
    # settings.logger.error "/process-scanned-code, request payload: #{request.body}, status: 400"
    halt 400, { status: result[:status], message: result[:body] }.to_json
  end
end

# Universal proxy route for all HTTP methods
%w[get post put patch delete].each do |method|
  # Insted of declarations like get '/api/*', post '/api/*' etc.
  send(method, '/api/*') do
    path = params['splat'].first
    request_body = request.body.read
    parsed_body = settings.api_proxy.parse_request_body(request_body)

    result = settings.api_proxy.forward_request(request.request_method, path, parsed_body)

    status result[:status]
    content_type :json
    result[:body]
  end
end

# fallback dla SPA (vue-router)
get '/*' do
  if settings.development?
    redirect "#{FRONTEND_URL}#{request.path}"
  else
    send_file File.join(settings.public_folder, 'index.html')
  end
end
