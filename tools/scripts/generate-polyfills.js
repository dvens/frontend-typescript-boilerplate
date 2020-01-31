const { config } = require('../utilities/get-config');

const getPolyfills = require('./polyfill-loader/get-polyfills');
const createLoaderScript = require('./polyfill-loader/loader-script');

async function generatePolyfills() {
    const polyfills = getPolyfills(config);
    console.log(createLoaderScript(['main.js'], polyfills, config));
}

module.exports = generatePolyfills;
