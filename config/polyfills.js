const config = require('./config');
const getAssetFilehash = require('../tools/utilities/get-asset-filehash');

const POLYFILL_OUTPUT_PATH = `/assets/js/polyfills/`;

// TODO: get entries through stats.json and legacy-stats.json;
const polyfillConfig = {
    templateOutputPath: `${config.components}/templates/scripts.tsx`,
    polyfillOutputPath: `${config.clientDist}${POLYFILL_OUTPUT_PATH}`,
    paths: {
        entries: `${config.assetPrefix}${config.jsOutputPath}`,
        polyfills: `${config.assetPrefix}${POLYFILL_OUTPUT_PATH}`,
    },
    modern: {
        files: [{ path: getAssetFilehash(`${config.clientDist}/stats.json`, 'main.js') }],
    },
    legacy: {
        test: "'noModule' in HTMLScriptElement.prototype",
        files: [
            {
                path: getAssetFilehash(
                    `${config.clientDist}/${config.legacyPrefix}stats.json`,
                    'main.js',
                    config.legacyPrefix,
                ),
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
        hash: true,
    },
};

module.exports = polyfillConfig;
