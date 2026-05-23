#!/bin/bash

echo "=== Deploy Backend to VPS ==="

echo "Building locally..."
npm run build

echo "Transferring files to VPS..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'dist' \
  ./ jefry@149.34.48.122:/var/www/schoolsaas-b/

echo "Installing dependencies on VPS..."
ssh jefry@149.34.48.122 "cd /var/www/schoolsaas-b && npm ci && npm run build"

echo "Restarting PM2..."
ssh jefry@149.34.48.122 "pm2 restart backend || pm2 start dist/main.js --name backend"

echo "=== Deploy Complete ==="