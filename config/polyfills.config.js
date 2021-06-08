const fs = require('fs');

module.exports = function config(defaultConfig) {
    const POLYFILL_OUTPUT_PATH = `${defaultConfig.publicPath}js/polyfills/`;

    const polyfillConfig = {
        polyfillsDir: `${defaultConfig.clientDist}${POLYFILL_OUTPUT_PATH}`,
        manifestDir: `${defaultConfig.clientDist}${defaultConfig.publicPath}`,
        relativePathToPolyfills: POLYFILL_OUTPUT_PATH,
        polyfills: {
            coreJs: true,
            regeneratorRuntime: true,
            webcomponents: true,
            fetch: true,
            intersectionObserver: true,
            minify: true,
            hash: true,
        },
    };

    return polyfillConfig;
};
