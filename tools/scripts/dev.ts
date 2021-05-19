import start from './start';
import clean from './clean';
import run from './run';
import generateFavicons from './favicons';

async function dev() {
    await run(clean);
    await start();
}

export default dev;
