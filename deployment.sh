#!/bin/bash

# Build Docker image
docker build -t electron-react-boiletplate .

# Deploy Docker container
docker-compose up -d