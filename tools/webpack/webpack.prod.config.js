const createBaseConfig = require('./webpack.common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');

const createConfig = (options, legacy = false) => {
    const baseConfig = createBaseConfig(options, legacy);

    const prodConfig = {
        plugins: [
            new MiniCssExtractPlugin({
                filename: '/assets/css/[name].css',
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
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
                    sourceMap: true,
                }),
            ],
        },
    };

    return merge(baseConfig, prodConfig);
};

module.exports = createConfig;
