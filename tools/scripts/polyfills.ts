import { projectDirectory } from '../config/config';
import { getPolyfills } from '../utilities/polyfills/get-polyfills';
import defaultConfig from '../config/config';
import { copyPolyfills } from '../utilities/polyfills';

let config = null;

try {
    config = require(`${projectDirectory}/config/polyfills.config.js`)(defaultConfig);
} catch (e) {
    /** noop */
}

async function generatePolyfills() {
    const polyfills = await getPolyfills(config);
    await copyPolyfills(config, polyfills);
}

export default generatePolyfills;
