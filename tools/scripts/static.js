// Utilities
const run = require('./run');
const getDefaultMode = require('../utilities/get-default-mode');
const isProduction = getDefaultMode() === 'production';

// Scripts
const bundle = require('./bundle');
const clean = require('./clean');
const generateStaticRoutes = require('./generate-static-routes');
const generatePolyfills = require('./generate-polyfills');
const generateServiceWorker = require('./generate-sw');
const generateFavicons = require('./generate-favicons');

async function staticBuild() {
    await run(clean);
    await run(bundle);
    if (isProduction) {
        await run(generateFavicons);
        await run(generatePolyfills);
    }
    await run(generateStaticRoutes);
    if (isProduction) {
        await run(generateServiceWorker);
    }
}

module.exports = staticBuild;
