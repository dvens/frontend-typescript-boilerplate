import start from './start';
import clean from './clean';
import run from './run';
import generatePolyfills from './polyfills';

async function dev() {
    await run(clean);
    await start();
    await generatePolyfills();
}

export default dev;
