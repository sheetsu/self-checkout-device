require 'sinatra'
require 'json'
require 'rack/cors'
require 'puma'
require 'yaml'

FRONETEND_URL = 'http://localhost:4001'.freeze

def load_config
  config = YAML.load_file("config.yml")
  raise "Config file not found" if config.nil?

  config
end

configure :development do
  require 'sinatra/reloader'
  also_reload './**/*.rb'
end

configure do
  set :server, "puma"
  set :bind, "0.0.0.0"
  set :port, 4000

  $backend_url = load_config['backned']['url']
  $backend_token = load_config['backned']['token']
end

use Rack::Cors do
  allow do
    origins FRONETEND_URL
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
    redirect "#{FRONETEND_URL}#{request.path}"
  else
    send_file File.join(settings.public_folder, 'index.html')
  end
end
