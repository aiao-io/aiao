const nxPreset = require('@nrwl/jest/preset').default;

module.exports = { ...nxPreset, coverageReporters: ['html', 'clover', 'json', 'lcov'] };
