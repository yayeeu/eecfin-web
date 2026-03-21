#!/bin/sh
set -e
cd /app
npm install --legacy-peer-deps
exec "$@"
