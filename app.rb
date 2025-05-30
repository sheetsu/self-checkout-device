require 'sinatra'
# Load application environment
require_relative 'config/environment'

configure :development do
  require 'sinatra/reloader'
  also_reload './**/*.rb'
end

configure do
  set :server, "puma"
  set :bind, "0.0.0.0"
  set :port, 4000

  set :api_proxy, ApiProxy.new(APP_CONFIG["backend"]["url"], APP_CONFIG["backend"]["token"])
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
  { message: "Hello Łordd" }.to_json
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
