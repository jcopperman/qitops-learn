# QitOps Learn Deployment Guide

This document provides instructions for deploying QitOps Learn to various environments.

## Prerequisites

- Node.js 20.x or later
- Docker and Docker Compose (for containerized deployments)
- Git

## Environment Variables

Copy the `.env.example` file to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Required environment variables:

- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk publishable key for client-side authentication
- `CLERK_PUBLISHABLE_KEY`: Same as above, needed for server-side authentication
- `CLERK_SECRET_KEY`: Clerk secret key for server-side authentication
- `PORT`: Port to run the server on (default: 8080)
- `NODE_ENV`: Environment (development, production)

## Deployment Options

### 1. Docker Deployment (Recommended)

The project includes a multi-stage Dockerfile that creates an optimized production image.

#### Build and run the Docker image:

```bash
# Build the image
docker build -t qitops-learn:latest .

# Run the container
docker run -p 8080:8080 \
  -e VITE_CLERK_PUBLISHABLE_KEY=your_key \
  -e CLERK_PUBLISHABLE_KEY=your_key \
  -e CLERK_SECRET_KEY=your_secret_key \
  qitops-learn:latest
```

#### Using Docker Compose:

For development:
```bash
docker-compose up app
```

For production-like environment:
```bash
docker-compose --profile prod up prod
```

### 2. Self-Hosting on a Physical Server

#### Build the application:

```bash
# Install dependencies
npm ci

# Build the application
npm run build

# Start the server
npm start
```

#### Using a Process Manager (PM2):

```bash
# Install PM2
npm install -g pm2

# Start the application
pm2 start server.js --name qitops-learn

# Make it start on boot
pm2 startup
pm2 save
```

### 3. Cloud Hosting Options

#### Fly.io

The project includes a `fly.toml` file for Fly.io deployment:

```bash
# Deploy to Fly.io
fly deploy

# Set secrets
fly secrets set VITE_CLERK_PUBLISHABLE_KEY=your_key CLERK_PUBLISHABLE_KEY=your_key CLERK_SECRET_KEY=your_secret_key
```

#### Digital Ocean App Platform

1. Connect your GitHub repository
2. Select the Node.js template
3. Configure environment variables
4. Deploy

#### AWS Elastic Beanstalk

1. Create a new application
2. Choose Docker as the platform
3. Upload the project as a ZIP file or connect to your repository
4. Configure environment variables
5. Deploy

#### Google Cloud Run

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/your-project/qitops-learn

# Deploy to Cloud Run
gcloud run deploy qitops-learn \
  --image gcr.io/your-project/qitops-learn \
  --platform managed \
  --set-env-vars VITE_CLERK_PUBLISHABLE_KEY=your_key,CLERK_PUBLISHABLE_KEY=your_key,CLERK_SECRET_KEY=your_secret_key
```

## Troubleshooting

### Common Issues

1. **Static assets not loading**: Check that the build directory structure is correct and that the server is properly configured to serve static assets.

2. **Authentication not working**: Verify that all Clerk environment variables are set correctly.

3. **Application crashes on startup**: Check the logs for errors. Common issues include missing environment variables or incorrect build configuration.

### Health Check

The application exposes a `/health` endpoint that returns a 200 OK response when the server is running correctly. Use this endpoint for monitoring and container orchestration.

### Logs

In production, logs are output to stdout/stderr. You can use your hosting platform's logging system to view them.

## Backup and Disaster Recovery

For self-hosted deployments, ensure you have:

1. Regular backups of your application data
2. A backup power supply if hosting on physical hardware
3. A disaster recovery plan

## Security Considerations

1. Always use HTTPS in production
2. Keep your Clerk secret key secure
3. Regularly update dependencies to patch security vulnerabilities
4. Consider implementing rate limiting for API endpoints

## Performance Optimization

1. Use a CDN for static assets
2. Consider implementing server-side caching
3. Monitor server resources and scale as needed
