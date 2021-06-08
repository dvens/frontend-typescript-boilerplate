import { projectDirectory } from '../config/config';
import { getPolyfills } from '../utilities/polyfills/get-polyfills';
import defaultConfig from '../config/config';
import { copyPolyfills } from '../utilities/polyfills';
import fs from 'fs';

let config = null;

try {
    config = require(`${projectDirectory}/config/polyfills.config.js`)(defaultConfig);
} catch (e) {
    /** noop */
}

async function generatePolyfills() {
    const polyfills = await getPolyfills(config);
    await copyPolyfills(config, polyfills);

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

    await fs.writeFileSync(`${data.manifestDir}polyfill-manifest.json`, JSON.stringify(data));
}

export default generatePolyfills;
