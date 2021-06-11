const fs = require('fs');

module.exports = function config(projectConfig) {
    const POLYFILL_OUTPUT_PATH = `${projectConfig.publicPath}js/polyfills/`;

    const polyfillConfig = {
        polyfillsDir: `${projectConfig.clientDist}${POLYFILL_OUTPUT_PATH}`,
        manifestDir: `${projectConfig.clientDist}${projectConfig.publicPath}`,
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
