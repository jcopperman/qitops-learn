import { createRequestHandler } from "@remix-run/express";
import express from "express";
import compression from "compression";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as build from "./build/server/index.js";
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = join(__dirname, "build/client");

// Log the contents of the build directory
console.log('Contents of build directory:');
try {
  const clientFiles = fs.readdirSync(BUILD_DIR);
  console.log('Client files:', clientFiles);

  const assetsDir = join(BUILD_DIR, 'assets');
  if (fs.existsSync(assetsDir)) {
    const assetFiles = fs.readdirSync(assetsDir);
    console.log('Asset files:', assetFiles);
  }
} catch (error) {
  console.error('Error reading build directory:', error);
}

const app = express();

// Use compression for all requests
app.use(compression());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static assets
app.use(express.static(BUILD_DIR, {
  maxAge: "1y",
  immutable: true
}));

// Handle Remix requests
app.all(
  "*",
  (req, res, next) => {
    console.log('Handling Remix request:', req.url);
    const handler = createRequestHandler({
      build,
      mode: process.env.NODE_ENV
    });
    return handler(req, res, next).catch(error => {
      console.error('Error handling request:', error);
      next(error);
    });
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
});
