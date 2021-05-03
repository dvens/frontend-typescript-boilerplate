const { merge } = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Config
const createBaseConfig = require('./webpack.common.config');

const createConfig = (options, legacy = false) => {
    const baseConfig = createBaseConfig(options, legacy);

    const devConfig = {
        entry: ['webpack-hot-middleware/client?reload=true'],
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: '/assets/css/[name].css',
            }),
        ],
    };

    return merge(baseConfig, devConfig);
};

module.exports = createConfig;
