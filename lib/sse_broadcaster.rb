class SseBroadcaster
  def initialize
    @connections = []
  end

  def add_connection(connection)
    @connections << connection
  end

  def remove_connection(connection)
    "fuu"
    @connections.delete(connection)
  end

  def broadcast(data)
    message = "data: #{data.to_json}\n\n"
    @connections.each do |connection|
      begin
        connection << message
      rescue StandardError
        # Remove dead connections
        @connections.delete(connection)
      end
    end
  end

  def connection_count
    @connections.size
  end
end
