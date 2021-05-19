import bundle from './bundle';
import clean from './clean';
import run from './run';
import generatePolyfills from './polyfills';

// const generatePolyfills = require('./polyfills');
// const generateServiceWorker = require('../utilities/generate-sw');

async function build() {
    await run(clean);
    await bundle();
    await generatePolyfills();
}

export default build;
