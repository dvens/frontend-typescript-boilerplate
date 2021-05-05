import clean from './clean';
import run from './run';

async function dev() {
    await run(clean);
}

export default dev;
