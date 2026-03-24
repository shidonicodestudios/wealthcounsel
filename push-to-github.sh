#!/bin/bash
# Run this on VPS host to push dashboard updates to GitHub

cd ~/wealthcounsel

echo "Pulling latest changes from container..."
docker cp openclaw-gateway:/data/.openclaw/workspace/wealthcounsel/. .

echo "Checking git status..."
git status

echo ""
echo "Ready to push. Run:"
echo "  git push origin main"
echo ""
echo "If prompted for credentials, use your GitHub username and Personal Access Token"
