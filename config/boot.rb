require 'zeitwerk'

# Setup autoloading for the application
loader = Zeitwerk::Loader.new
loader.push_dir("#{__dir__}/../lib")

# Enable reloading in development (must be before setup)
if ENV['RACK_ENV'] == 'development' || ENV['SINATRA_ENV'] == 'development'
  loader.enable_reloading
end

loader.setup