const run = require('./run');
const bundle = require('./bundle');
const clean = require('./clean');
const generatePolyfills = require('../utilities/generate-polyfills');
const generateServiceWorker = require('../utilities/generate-sw');

async function build() {
    await run(clean);
    await run(bundle);
    await run(generatePolyfills);
    // await run(generateServiceWorker);
}

module.exports = build;
