import clean from './clean';
import generatePolyfills from './polyfills';
import run from './run';

// const bundle = require('./bundle');
// const clean = require('./clean');
// const generatePolyfills = require('./polyfills');
// const generateServiceWorker = require('../utilities/generate-sw');

async function dev() {
    await run(clean);
    await run(generatePolyfills);
    // await run(bundle);

    // await run(generateServiceWorker);
}

export default dev;
