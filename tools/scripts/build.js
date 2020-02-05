const run = require('./run');
const bundle = require('./bundle');
const clean = require('./clean');
const generatePolyfills = require('./generate-polyfills');

async function staticBuild() {
    await run(clean);
    await run(bundle);
    await run(generatePolyfills);
}

module.exports = staticBuild;
