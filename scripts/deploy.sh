#!/bin/bash

echo "=== Deploy Backend to VPS ==="

echo "Building locally..."
npm run build

echo "Transferring files to VPS..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'dist' \
  ./ user@YOUR_VPS_IP:/var/www/backend/

echo "Installing dependencies on VPS..."
ssh user@YOUR_VPS_IP "cd /var/www/backend && npm ci && npm run build"

echo "Restarting PM2..."
ssh user@YOUR_VPS_IP "pm2 restart backend || pm2 start dist/main.js --name backend"

echo "=== Deploy Complete ==="