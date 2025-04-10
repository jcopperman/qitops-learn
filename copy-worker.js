import fs from 'fs';
import path from 'path';

// Copy _worker.js to build directory
const workerContent = fs.readFileSync('./_worker.js', 'utf8');
fs.writeFileSync(path.join('./build', '_worker.js'), workerContent);

console.log('✅ Copied _worker.js to build directory');
