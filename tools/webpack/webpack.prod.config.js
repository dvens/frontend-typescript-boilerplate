const createBaseConfig = require('./webpack.common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');
const { config } = require('../utilities/get-config');

const createConfig = (options, legacy = false) => {
    const baseConfig = createBaseConfig(options, legacy);
    const manifestFileName = legacy
        ? `${config.legacyPrefix}asset-manifest.json`
        : 'asset-manifest.json';

    const prodConfig = {
        plugins: [
            new MiniCssExtractPlugin({
                filename: '/assets/css/[name].css',
            }),
            new WebpackManifestPlugin({
                fileName: manifestFileName,
            }),
        ],
    };

    return merge(baseConfig, prodConfig);
};

module.exports = createConfig;
