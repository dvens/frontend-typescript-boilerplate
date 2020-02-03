const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const { config } = require('../utilities/get-config');
const getPolyfills = require('./polyfill-loader/get-polyfills');
const createLoaderScript = require('./polyfill-loader/loader-script');

async function copyPolyfills(polyfills) {
    await polyfills.map(async polyfill => {
        await mkdirp(path.dirname(polyfill.url));
        await fs.writeFileSync(polyfill.url, polyfill.code);
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
