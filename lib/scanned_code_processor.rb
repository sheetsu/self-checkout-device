require 'json'

class ScannedCodeProcessor
  def initialize(api_proxy, sse_broadcaster = nil)
    @api_proxy = api_proxy
    @sse_broadcaster = sse_broadcaster
  end

  def process_request(request_body)
    request_payload = JSON.parse(request_body)
    code = request_payload["code"]
    kind = request_payload["kind"]

    # Log the received code
    puts "Received #{kind} code: #{code}"

    # Validate required parameters
    validation_error = validate_parameters(code, kind)
    return validation_error if validation_error

    # FUTURE: if kind == "menu_item" => forward_to_frontend
    result = forward_to_backend(code, kind)

    {
      status: result[:status],
      body: result[:body]
    }
  rescue JSON::ParserError
    {
      status: 400,
      body: { error: "Invalid JSON payload" }.to_json
    }
  rescue StandardError => e
    puts "Error processing scanned code: #{e.message}"
    {
      status: 500,
      body: { error: "Internal server error" }.to_json
    }
  end

  private

  def validate_parameters(code, kind)
    if code.nil? || code.empty?
      return {
        status: 400,
        body: { error: "Missing or empty 'code' parameter" }.to_json
      }
    end

    if kind.nil? || kind != "card" && kind != "qr"
      return {
        status: 400,
        body: { error: "Invalid 'kind' parameter. Must be 'card' or 'qr'" }.to_json
      }
    end

    nil
  end

  def forward_menu_item_to_backend(code); end

  def forward_to_backend(code, kind)
    result = @api_proxy.forward_request("POST", "v2/self_checkout_devices/employees/identify", { identifier: code })

    # Broadcast SSE message if broadcaster is available
    if @sse_broadcaster
      @sse_broadcaster.broadcast({
        type: 'scanned_code_response',
        code: code,
        kind: kind,
        status: result[:status],
        response: JSON.parse(result[:body])
      })
    end

    result
  end
end
