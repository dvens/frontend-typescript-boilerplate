const merge = require('webpack-merge');
const webpack = require('webpack');

// Config
const createBaseConfig = require('./webpack.common.config');

const createConfig = (options, legacy = false) => {

    const baseConfig = createBaseConfig(options, legacy);

    const devConfig = {
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ]
    };

    return merge(baseConfig, devConfig);

};

module.exports = (userOptions) => {

    // Uncomment: if you want to run legacy and modern in dev mode.
    // return [createConfig(userOptions, true), createConfig(userOptions)];

    // By default legacy is running in dev mode.
    return [createConfig(userOptions, true)];

};
