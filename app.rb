require 'sinatra'
require 'json'
require 'rack/cors'


configure :development do
  require 'sinatra/reloader'
  also_reload './**/*.rb'
end

use Rack::Cors do
  allow do
    origins 'http://localhost:5173'
    resource '*', headers: :any, methods: [:get, :post, :options]
  end
end

set :public_folder, File.expand_path('public', __dir__)
set :static, true

# API endpoint
get '/api/hello' do
  content_type :json
  { message: "Hello Łordd" }.to_json
end

# fallback dla SPA (vue-router)
get '/*' do
  if settings.development?
    redirect "http://localhost:5173#{request.path}"
  else
    send_file File.join(settings.public_folder, 'index.html')
  end
end
