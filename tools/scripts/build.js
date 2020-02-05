const run = require('./run');
const bundle = require('./bundle');
const clean = require('./clean');
const generatePolyfills = require('./generate-polyfills');
const generateServiceWorker = require('./generate-sw');
const generateFavicons = require('./generate-favicons');

async function build() {
    await run(clean);
    await run(generateFavicons);
    await run(bundle);
    await run(generatePolyfills);
    await run(generateServiceWorker);
}

module.exports = build;
