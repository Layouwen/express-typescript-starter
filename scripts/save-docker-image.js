const { execSync } = require('child_process');
const pkg = require('../package.json');

execSync(`docker save -o ./images/${pkg.name}-v${pkg.version}.tar ${pkg.name}:v${pkg.version}`, { stdio: 'inherit' });
execSync(`cd ./docker-images && tar -zvcf ${pkg.name}-v${pkg.version}.tar.gz ${pkg.name}-v${pkg.version}.tar`, {
  stdio: 'inherit',
});
