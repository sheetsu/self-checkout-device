#!/bin/bash

# Start Sinatra backend
ruby app.rb &

# Start Vite frontend
cd frontend && yarn dev
