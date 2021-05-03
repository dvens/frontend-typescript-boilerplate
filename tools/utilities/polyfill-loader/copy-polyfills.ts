import fs from 'fs';
import mkdirp from 'mkdirp';

import globalConfig from '../get-config';
const { polyfillLoader } = globalConfig;

async function copyPolyfills(polyfills) {
    return new Promise((resolve) => {
        mkdirp(polyfillLoader.polyfillOutputPath, async () => {
            await polyfills.forEach(async (polyfill) => {
                await fs.writeFileSync(polyfill.url, polyfill.code);
            });

            resolve(true);
        });
    });
}

export default copyPolyfills;
