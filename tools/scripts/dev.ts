import start from './start';
import clean from './clean';
import run from './run';
import generatePolyfills from './polyfills';

async function dev() {
    await run(clean);
    await generatePolyfills();
    await start();
}

export default dev;
