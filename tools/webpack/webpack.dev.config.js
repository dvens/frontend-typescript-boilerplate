const merge = require('webpack-merge');
const webpack = require('webpack');

// Config
const createBaseConfig = require('./webpack.common.config');

const createConfig = (options, legacy = false) => {

    const baseConfig = createBaseConfig(options, legacy);

    const devConfig = {
        entry: ['webpack-hot-middleware/client'],
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ]
    };

    return merge(baseConfig, devConfig);

};

module.exports = createConfig;
