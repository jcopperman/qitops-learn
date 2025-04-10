import fs from 'fs';
import path from 'path';

// Create _routes.json file for Cloudflare Pages
const routesConfig = {
  version: 1,
  include: ["/*"],
  exclude: [
    "/build/*",
    "/assets/*",
    "/_assets/*",
    "/favicon.ico",
    "/robots.txt"
  ]
};

// Ensure the build/client directory exists
if (!fs.existsSync('./build/client')) {
  fs.mkdirSync('./build/client', { recursive: true });
}

// Write the _routes.json file
fs.writeFileSync(
  path.join('./build/client', '_routes.json'),
  JSON.stringify(routesConfig, null, 2)
);

console.log('✅ Generated _routes.json for Cloudflare Pages');
