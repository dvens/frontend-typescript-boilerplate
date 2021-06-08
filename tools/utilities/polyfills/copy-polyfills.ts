import fs from 'fs';
import mkdirp from 'mkdirp';

export async function copyPolyfills(config, polyfills) {
    return new Promise((resolve) => {
        mkdirp(config.polyfillsDir, async () => {
            await polyfills.forEach(async (polyfill) => {
                await fs.writeFileSync(polyfill.url, polyfill.code);
            });

            resolve(true);
        });
    });
}
