const config = require('./config');

const POLYFILL_OUTPUT_PATH = '/assets/js/polyfills/';

// TODO: get entries through stats.json and legacy-stats.json;
const polyfillConfig = {
    outputPath: `${config.components}/templates/scripts.tsx`,
    polyfillOutputFolder: `${config.clientDist}${POLYFILL_OUTPUT_PATH}`,
    assetPrefix: {
        entries: `${config.assetPrefix}${config.jsOutputPath}`,
        polyfills: `${config.assetPrefix}${POLYFILL_OUTPUT_PATH}`,
    },
    modern: {
        files: [{ path: 'main.js' }],
    },
    legacy: {
        test: "'noModule' in HTMLScriptElement.prototype",
        files: [
            {
                path: `${config.legacyPrefix}main.js`,
            },
        ],
    },
    polyfills: {
        coreJs: true,
        regeneratorRuntime: true,
        webcomponents: true,
        fetch: true,
        intersectionObserver: true,
        minify: true,
    },
};

module.exports = polyfillConfig;
