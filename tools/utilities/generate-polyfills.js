const fs = require('fs');
const mkdirp = require('mkdirp');

const { config } = require('./get-config');
const getPolyfills = require('./polyfill-loader/get-polyfills');
const createLoaderScript = require('./polyfill-loader/loader-script');

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

async function generatePolyfills() {
    const polyfills = getPolyfills(config);

    await copyPolyfills(polyfills);
    await fs.writeFileSync(
        `${config.pages}/_layouts/scripts.njk`,
        createLoaderScript(config.distEntries, polyfills, config),
    );
}

module.exports = generatePolyfills;
