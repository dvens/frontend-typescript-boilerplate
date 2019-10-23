const webpackProdConfig = require('./tools/webpack/webpack.prod.config');
const webpackDevConfig = require('./tools/webpack/webpack.dev.config');

const getDefaultMode = require('./tools/utilities/get-default-mode');
const resolveApp = require('./tools/utilities/resolve-app');
const isProduction = getDefaultMode() === 'production';

const clientConfig = {
    entry: [resolveApp('src/index.ts')],
    includedPackages: [/node_modules\/(?!@atomify)/]
};

function getBuildOptions() {

    if (isProduction) {
        // Legacy and normal build
        return [webpackProdConfig(clientConfig, true), webpackProdConfig(clientConfig)]
    } else {
        // Legacy build
        return webpackDevConfig(clientConfig, true);
    }

}

// TODO: add the option to build the server.
module.exports = getBuildOptions();
