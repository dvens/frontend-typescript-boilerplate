const run = require('./run');
const bundle = require('./bundle');
const clean = require('./clean');
const createStaticRoutes = require('./create-static-routes');
const generatePolyfills = require('./generate-polyfills');
const generateServiceWorker = require('./generate-sw');
const generateFavicons = require('./generate-favicons');

async function staticBuild() {
    await run(clean);
    await run(generateFavicons);
    await run(bundle);
    await run(generatePolyfills);
    await run(createStaticRoutes);
    await run(generateServiceWorker);
}

module.exports = staticBuild;
