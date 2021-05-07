// const webpackProdConfig = require('./tools/webpack/webpack.prod.config');
// const webpackDevConfig = require('./tools/webpack/webpack.dev.config');

import createClientDevConfig from './tools/webpack/client/client.dev';

// const getDefaultMode = require('./tools/utilities/get-default-mode');
// const isProduction = getDefaultMode() === 'production';

const clientConfig = {
    // includedPackages: [/node_modules\/(?!@atomify)/],
};

function getBuildOptions() {
    // if (isProduction) {
    //     // Legacy and normal build
    //     return [webpackProdConfig(clientConfig, true), webpackProdConfig(clientConfig)];
    // } else {
    //     // Legacy build
    //     return webpackDevConfig(clientConfig);
    // }

    return [createClientDevConfig(clientConfig)];
}

export default getBuildOptions();
