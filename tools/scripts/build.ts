import bundle from './bundle';
import clean from './clean';
import run from './run';

// const bundle = require('./bundle');
// const clean = require('./clean');
// const generatePolyfills = require('./polyfills');
// const generateServiceWorker = require('../utilities/generate-sw');

async function build() {
    await run(clean);
    await bundle();
}

export default build;
