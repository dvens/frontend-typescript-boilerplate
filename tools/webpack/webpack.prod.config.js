// Config
const createBaseConfig = require('./webpack.common.config');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');

const createConfig = (options, legacy = false) => {

    const baseConfig = createBaseConfig(options, legacy);

    const prodConfig = {
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
            ]
        }
    };

    return merge(baseConfig, prodConfig);

};

module.exports = (userOptions) => {

    return [createConfig(userOptions, true), createConfig(userOptions)]

};
