const { execSync } = require('child_process');
const pkg = require('../package.json');

execSync(`docker build -t ${pkg.name}:v${pkg.version} .`, { stdio: 'inherit' });
