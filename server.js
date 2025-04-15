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

// Set port for Heroku deployment
const port = process.env.PORT || 3000;

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Add a test route that returns plain HTML
app.get('/test-page', (req, res) => {
  console.log('Serving test page');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Test Page</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>Test Page</h1>
        <p>If you can see this, the Express server is working correctly!</p>
        <p>Current time: ${new Date().toISOString()}</p>
        <p>This is a direct response from the server, bypassing Remix.</p>
      </body>
    </html>
  `);
});

// Serve static assets with different cache settings based on file type
app.use(express.static(BUILD_DIR, {
  setHeaders: (res, path) => {
    // Don't cache HTML files
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-store, max-age=0');
    } else {
      // Cache other assets for a year
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Explicitly serve assets directory with a more permissive approach
app.use('/assets', (req, res, next) => {
  console.log('Asset request:', req.url);
  // Try to serve the asset directly
  express.static(join(BUILD_DIR, 'assets'), {
    maxAge: '1y',
    immutable: true
  })(req, res, (err) => {
    if (err) {
      console.log('Error serving asset:', err);
      // If there's an error, log it and continue to the next middleware
      next();
    }
  });
});

// Handle specific asset requests that might have different hashes
app.get('/assets/index-Bc8ThY2o.js', (req, res) => {
  console.log('Redirecting to available index.js file');
  // Find any index-*.js file in the assets directory
  try {
    const assetFiles = fs.readdirSync(join(BUILD_DIR, 'assets'));
    const indexFile = assetFiles.find(file => file.startsWith('index-') && file.endsWith('.js'));
    if (indexFile) {
      res.redirect(`/assets/${indexFile}`);
    } else {
      res.status(404).send('Asset not found');
    }
  } catch (error) {
    console.error('Error finding index file:', error);
    res.status(500).send('Server error');
  }
});

// Handle CSS file requests
app.get('/assets/tailwind-CwPCyDOi.css', (req, res) => {
  console.log('Redirecting to available tailwind CSS file');
  try {
    const assetFiles = fs.readdirSync(join(BUILD_DIR, 'assets'));
    const cssFile = assetFiles.find(file => file.startsWith('tailwind-') && file.endsWith('.css'));
    if (cssFile) {
      res.redirect(`/assets/${cssFile}`);
    } else {
      res.status(404).send('CSS file not found');
    }
  } catch (error) {
    console.error('Error finding CSS file:', error);
    res.status(500).send('Server error');
  }
});

// Handle browser.js request
app.get('/assets/browser-CxQKvkkr.js', (req, res) => {
  console.log('Redirecting to available browser.js file');
  // Find any browser-*.js file in the assets directory
  try {
    const assetFiles = fs.readdirSync(join(BUILD_DIR, 'assets'));
    const browserFile = assetFiles.find(file => file.startsWith('browser-') && file.endsWith('.js'));
    if (browserFile) {
      res.redirect(`/assets/${browserFile}`);
    } else {
      res.status(404).send('Asset not found');
    }
  } catch (error) {
    console.error('Error finding browser file:', error);
    res.status(500).send('Server error');
  }
});

// Generic handler for any asset with a hash mismatch
app.get('/assets/:prefix-:hash.:ext', (req, res, next) => {
  const { prefix, ext } = req.params;
  console.log(`Generic asset handler for ${prefix}-*.${ext}`);

  // Skip if this is already a valid path
  if (fs.existsSync(join(BUILD_DIR, 'assets', `${req.path.substring(1)}`))) {
    return next();
  }

  try {
    const assetFiles = fs.readdirSync(join(BUILD_DIR, 'assets'));
    const matchingFile = assetFiles.find(file => {
      return file.startsWith(`${prefix}-`) && file.endsWith(`.${ext}`);
    });

    if (matchingFile) {
      console.log(`Found matching file: ${matchingFile}`);
      res.redirect(`/assets/${matchingFile}`);
    } else {
      console.log(`No matching file found for ${prefix}-*.${ext}`);
      next();
    }
  } catch (error) {
    console.error(`Error finding ${prefix} file:`, error);
    next();
  }
});

// Handle Remix requests
app.all(
  "*",
  (req, res, next) => {
    console.log('Handling Remix request:', req.url);
    try {
      const handler = createRequestHandler({
        build,
        mode: process.env.NODE_ENV
      });
      return handler(req, res, next).catch(error => {
        console.error('Error handling request:', error);
        next(error);
      });
    } catch (error) {
      console.error('Error creating request handler:', error);
      next(error);
    }
  }
);

// Fallback: Serve index.html for all routes that don't match anything else
app.use('*', (req, res) => {
  console.log('Fallback: Serving index.html for path:', req.path);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(join(BUILD_DIR, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 8080;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Express server listening on ${host}:${port}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
});
