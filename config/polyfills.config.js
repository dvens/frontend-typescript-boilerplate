const fs = require('fs');

module.exports = function config(defaultConfig) {
    const manifestPath = `${defaultConfig.clientDist}${defaultConfig.publicPath}asset-manifest.json`;
    const POLYFILL_OUTPUT_PATH = `${defaultConfig.publicPath}js/polyfills/`;

    const polyfillConfig = {
        templateOutputPath: `${defaultConfig.components}/templates/scripts.tsx`,
        polyfillsDir: `${defaultConfig.clientDist}${POLYFILL_OUTPUT_PATH}`,
        relativePathToPolyfills: POLYFILL_OUTPUT_PATH,
        modern: {
            files: [{ path: getAssetManifest('main.js', manifestPath) }],
        },
        legacy: {
            test: "'noModule' in HTMLScriptElement.prototype",
            files: [
                {
                    path: getAssetManifest('legacy-main.js', manifestPath),
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

    return polyfillConfig;
};

/**
 * Get file paths through asset manifest.
 * @param {*} key
 * @param {*} filePath
 * @returns
 */
function getAssetManifest(key, filePath) {
    let hash = key;

    if (fs.existsSync(filePath)) {
        const statsFile = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(statsFile);
        if (data[key]) {
            hash = data[key];
        } else {
            console.error(`The ${key} is not available in the json file`);
        }
    }

    return hash;
}
