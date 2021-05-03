import clean from './clean';
import generatePolyfills from './polyfills';
import run from './run';
import generateServiceWorker from './sw';

// const bundle = require('./bundle');
// const clean = require('./clean');
// const generatePolyfills = require('./polyfills');
// const generateServiceWorker = require('../utilities/generate-sw');

async function build() {
    await run(clean);
    await run(generatePolyfills);
    // await run(bundle);

    await run(generateServiceWorker);
}

export default build;
