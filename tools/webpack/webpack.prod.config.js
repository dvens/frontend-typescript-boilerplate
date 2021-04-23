const createBaseConfig = require('./webpack.common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');
const { config } = require('../utilities/get-config');

const createConfig = (options, legacy = false) => {
    const baseConfig = createBaseConfig(options, legacy);
    const manifestFileName = legacy ? `${config.legacyPrefix}stats.json` : 'stats.json';

    const prodConfig = {
        plugins: [
            new MiniCssExtractPlugin({
                filename: '/assets/css/[name].css',
            }),
            new WebpackManifestPlugin({
                fileName: manifestFileName,
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        keep_classnames: true,
                        keep_fnames: true,
                        mangle: true,
                        safari10: true,
                        output: {
                            comments: false,
                        },
                    },
                    parallel: true,
                }),
            ],
        },
    };

    return merge(baseConfig, prodConfig);
};

module.exports = createConfig;
