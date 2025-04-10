import fs from 'fs';
import path from 'path';

// Copy _worker.js to build directory
const workerContent = fs.readFileSync('./_worker.js', 'utf8');
fs.writeFileSync(path.join('./build', '_worker.js'), workerContent);

// Create a simple _routes.json file
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

// Write the _routes.json file
fs.writeFileSync(
  path.join('./build/client', '_routes.json'),
  JSON.stringify(routesConfig, null, 2)
);

console.log('✅ Copied _worker.js to build directory and created _routes.json');
