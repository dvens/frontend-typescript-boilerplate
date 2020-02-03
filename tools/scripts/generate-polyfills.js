const fs = require('fs');

const { config } = require('../utilities/get-config');
const getPolyfills = require('./polyfill-loader/get-polyfills');
const createLoaderScript = require('./polyfill-loader/loader-script');

async function generatePolyfills() {
    const polyfills = getPolyfills(config);
    const code = createLoaderScript(config.distEntries, polyfills, config);

    await fs.writeFileSync(`${config.pages}/_layouts/scripts.njk`, code);
}

module.exports = generatePolyfills;
