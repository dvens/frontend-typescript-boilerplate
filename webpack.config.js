const path = require('path');

const webpackProdConfig = require('./tools/webpack/webpack.prod.config');
const webpackDevConfig = require('./tools/webpack/webpack.dev.config');

const getDefaultMode = require('./tools/utilities/get-default-mode');
const isProduction = getDefaultMode() === 'production';

const config = {
    entry: path.resolve(__dirname, 'src') + '/index.ts',
    includedPackages: [/node_modules\/(?!@atomify)/]
};

module.exports = isProduction ? webpackProdConfig(config) : webpackDevConfig(config);
