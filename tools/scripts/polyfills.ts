import { projectDirectory } from '../config/config';
import { getPolyfills } from '../utilities/polyfills/get-polyfills';
import defaultConfig from '../config/config';
import { copyPolyfills } from '../utilities/polyfills';
import fs from 'fs';
import getDefaultMode from '../utilities/get-default-mode';

const IS_PRODUCTION = getDefaultMode() === 'production';
let config = null;

try {
    config = require(`${projectDirectory}/config/polyfills.config.js`)(defaultConfig);
} catch (e) {
    /** noop */
}

async function generatePolyfills() {
    const polyfills = await getPolyfills(config);

    if (IS_PRODUCTION) {
        await copyPolyfills(config, polyfills);
    }

    // Generate polyfill-manifest.json
    const data = {
        ...config,
        generatedPolyfills: polyfills.map(({ test, nomodule, module, name }) => ({
            test,
            module,
            nomodule,
            name,
        })),
    };

    await fs.writeFileSync(`${data.manifestDir}polyfills-manifest.json`, JSON.stringify(data));
}

export default generatePolyfills;
