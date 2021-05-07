import start from './start';
import clean from './clean';
import run from './run';

async function dev() {
    await run(clean);
    await start();
}

export default dev;
