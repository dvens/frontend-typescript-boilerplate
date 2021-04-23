const fs = require('fs');
const mkdirp = require('mkdirp');

const { config } = require('./get-config');

async function copyPolyfills(polyfills) {
    return new Promise((resolve) => {
        mkdirp(`${config.dist}${config.polyfillOutputPath}`, async () => {
            await polyfills.forEach(async (polyfill) => {
                await fs.writeFileSync(polyfill.url, polyfill.code);
            });

            resolve();
        });
    });
}

module.exports = copyPolyfills;
