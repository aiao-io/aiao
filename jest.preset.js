const nxPreset = require('@nrwl/jest/preset');

module.exports = { ...nxPreset, coverageReporters: ['html', 'json', 'clover', 'json', 'lcov', 'text'] };
