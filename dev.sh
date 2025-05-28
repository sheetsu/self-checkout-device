#!/bin/bash

# Start Sinatra backend
ruby app.rb &

# Start Vue frontend on port 4001
cd frontend && yarn serve
