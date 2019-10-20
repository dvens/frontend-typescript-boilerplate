const webpackProdConfig = require('./tools/webpack/webpack.prod.config');
const webpackDevConfig = require('./tools/webpack/webpack.dev.config');

const getDefaultMode = require('./tools/utilities/get-default-mode');
const resolveApp = require('./tools/utilities/resolve-app');
const isProduction = getDefaultMode() === 'production';

const clientConfig = {
    entry: resolveApp('src/index.ts'),
    includedPackages: [/node_modules\/(?!@atomify)/]
};

module.exports = isProduction ? [...webpackProdConfig(clientConfig)] : [...webpackDevConfig(clientConfig)];
