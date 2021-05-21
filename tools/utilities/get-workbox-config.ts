import path from 'path';

import defaultConfig from '../config/config';

function getWorkboxConfig() {
    const workboxConfigPath = path.join(defaultConfig.root, 'workbox-config.js');

    let defaultWorboxConfig = {
        // where to output the generated sw
        swDest: path.join(defaultConfig.dist, 'sw.js'),
        // directory to match patterns against to be precached
        globDirectory: defaultConfig.dist,
        // cache any html js and css by default
        globPatterns: ['**/*.{js,css,eot,ttf,woff,json}'],
        runtimeCaching: [
            {
                urlPattern: /\/static\/images\//,
                handler: 'StaleWhileRevalidate',
            },
        ],
    };

    if (defaultConfig.injectManifest) {
        defaultWorboxConfig = Object.assign(
            {},
            {
                swSrc: defaultConfig.swSrc,
            },
            defaultWorboxConfig,
        );

        delete defaultWorboxConfig.runtimeCaching;
    }

    try {
        return require(workboxConfigPath);
    } catch (error) {
        return defaultWorboxConfig;
    }
}

export default getWorkboxConfig;
