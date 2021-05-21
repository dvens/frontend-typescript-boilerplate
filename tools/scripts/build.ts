import bundle from './bundle';
import clean from './clean';
import run from './run';
import generatePolyfills from './polyfills';
import generateServiceWorker from './sw';

async function build() {
    await run(clean);
    await bundle();
    await generatePolyfills();
    await generateServiceWorker();
}

export default build;
