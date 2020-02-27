const path = require('path');
const { config } = require('./get-config');

function getWorkboxConfig() {
    const workboxConfigPath = path.join(config.root, 'workbox-config.js');

    let defaultWorboxConfig = {
        // where to output the generated sw
        swDest: path.join(config.dist, 'sw.js'),
        // directory to match patterns against to be precached
        globDirectory: config.dist,
        // cache any html js and css by default
        globPatterns: ['**/*.{js,css,eot,ttf,woff,json}'],
        runtimeCaching: [{ urlPattern: /\/assets\/images\//, handler: 'StaleWhileRevalidate' }],
    };

    if (config.offlineSupport) {
        defaultWorboxConfig = Object.assign({}, { swSrc: config.swSrc }, defaultWorboxConfig);
    }

    try {
        return require(workboxConfigPath);
    } catch (error) {
        return defaultWorboxConfig;
    }
}

module.exports = getWorkboxConfig;
