# CI/CD Setup Guide

## Prerequisites
- VPS with SSH access
- GitHub repository
- PM2 installed on VPS

## Step 1: Create GitHub Repository
1. Go to github.com and create a new repo
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

## Step 2: Setup VPS
SSH into your VPS and run:
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Create directory
sudo mkdir -p /var/www/backend
sudo chown $USER:$USER /var/www/backend

# Clone repo (do this once manually)
git clone https://github.com/YOUR_USER/YOUR_REPO.git /var/www/backend
cd /var/www/backend
npm install
npm run build
pm2 start dist/main.js --name backend
pm2 save
```

## Step 3: Configure GitHub Secrets
In your GitHub repo, go to Settings > Secrets and add:
- `VPS_HOST`: Your VPS IP address
- `VPS_USER`: Your SSH username
- `VPS_SSH_KEY`: Your private SSH key
- `VPS_DEPLOY_PATH`: Path where app is deployed (e.g., `/var/www/backend`)

## Step 4: Local Deploy Script
Edit `scripts/deploy.sh` with your VPS credentials and run:
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## How it works
1. Push to `main` branch triggers GitHub Actions
2. Actions builds the app
3. SSH connects to VPS and runs `git pull`
4. PM2 restarts the application