require 'yaml'

class ConfigLoader
  def self.load_yaml(filename)
    config = YAML.load_file(filename)
    raise "Config file not found" if config.nil?
    config
  rescue Errno::ENOENT
    raise "Config file '#{filename}' does not exist"
  end
end
