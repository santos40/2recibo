#!/bin/bash

# Install Netlify CLI locally if not installed
echo "Installing Netlify CLI locally..."
npm install netlify-cli --save-dev

# Build the project
echo "Building project..."
npm run build

# Deploy to Netlify (draft deployment)
echo "Deploying to Netlify..."
npx netlify deploy

# For production deployment, uncomment the line below:
# npx netlify deploy --prod