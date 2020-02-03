const run = require('./run');
const bundle = require('./bundle');
const clean = require('./clean');
const createStaticRoutes = require('./create-static-routes');
const generatePolyfills = require('./generate-polyfills');

async function staticBuild() {
    await run(clean);
    await run(bundle);
    await run(generatePolyfills);
    await run(createStaticRoutes);
}

module.exports = staticBuild;
