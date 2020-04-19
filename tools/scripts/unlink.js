const fs = require('fs');

try {
  fs.unlinkSync('node_modules/@aiao');
} catch (error) {}
