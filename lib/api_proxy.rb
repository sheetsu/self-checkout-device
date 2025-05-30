require 'http'
require 'json'

class ApiProxy
  def initialize(backend_url, api_token)
    @backend_url = backend_url
    @api_token = api_token
  end

  def forward_request(method, path, body = nil)
    url = "#{@backend_url}/api/#{path}"
    headers = { "X-API-TOKEN" => @api_token }

    response = case method.downcase
    when 'get'
      HTTP.headers(headers).get(url)
    when 'post'
      HTTP.headers(headers).post(url, json: body)
    when 'put'
      HTTP.headers(headers).put(url, json: body)
    when 'patch'
      HTTP.headers(headers).patch(url, json: body)
    when 'delete'
      HTTP.headers(headers).delete(url)
    else
      raise "Unsupported HTTP method: #{method}"
    end

    {
      status: response.code,
      body: response.body.to_s,
      headers: response.headers.to_h
    }
  end

  def parse_request_body(request_body)
    return nil if request_body.nil? || request_body.empty?
    JSON.parse(request_body)
  rescue JSON::ParserError
    request_body
  end
end
