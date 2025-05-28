#!/bin/bash

# build FE app
cd frontend && yarn build &

# Start Sinatra backend
RACK_ENV=production ruby app.rb
