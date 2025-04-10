import fs from 'fs';
import path from 'path';

// Function to copy a file
function copyFile(source, target) {
  const targetDir = path.dirname(target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.copyFileSync(source, target);
}

// Function to copy a directory recursively
function copyDir(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    const stats = fs.statSync(sourcePath);
    if (stats.isDirectory()) {
      copyDir(sourcePath, targetPath);
    } else {
      copyFile(sourcePath, targetPath);
    }
  }
}

// Copy build/client to public
console.log('Copying build/client to public...');
copyDir('./build/client', './public');
console.log('✅ Successfully copied build/client to public');

// Create a _routes.json file in the public directory
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

fs.writeFileSync(
  path.join('./public', '_routes.json'),
  JSON.stringify(routesConfig, null, 2)
);
console.log('✅ Created _routes.json in public directory');
