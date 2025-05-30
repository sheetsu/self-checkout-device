# Application environment setup
require 'bundler/setup'
Bundler.require(:default, ENV['RACK_ENV'] || 'development')
require_relative './boot'

# Load application configuration
APP_CONFIG = ConfigLoader.load_yaml("#{__dir__}/../config.yml")

# Application constants
FRONTEND_URL = 'http://localhost:4001'.freeze
