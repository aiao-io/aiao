const fs = require('fs');
const pkg = require('../../package.json');
try {
  fs.unlinkSync(`node_modules/@${pkg.name}`);
} catch (error) {}
