ENV['RACK_ENV'] = 'test'
require_relative '../app'
require 'minitest/autorun'
require 'rack/test'
require 'json'

class AppTest < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_my_default
    get '/api/hello'
    assert_equal 200, last_response.status
    response_data = JSON.parse(last_response.body)
    assert_equal 'Hello Łordd', response_data['message']
  end
end
