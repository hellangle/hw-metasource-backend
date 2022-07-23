#!/bin/bash

git pull origin main
docker build --target production-build-stage -t hw-metasource-backend .

docker rm -f hw-metasource-backend || echo 'ignore'
docker run -d -p 3000:3000 --name hw-metasource-backend hw-metasource-backend

echo "Starting"
