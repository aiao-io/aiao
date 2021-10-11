const nxPreset = require('@nrwl/jest/preset');

module.exports = { ...nxPreset, coverageReporters: ['html', 'clover', 'json', 'lcov'] };
