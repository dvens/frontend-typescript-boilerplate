// Config
const config = require('../../config/config');
const createBaseConfig = require('./webpack.common.config');

// Settings/loaders
const configureBabelLoader = require('../loaders/javascript-typescript');
const eslintConfig = require('../loaders/eslint');

const createConfig = (options, legacy = false) => {

    const baseConfig = createBaseConfig(options, legacy);

    const prodConfig = {
        module: {
            rules: [
                ...configureBabelLoader({
                    transpilePackages: config.transpilePackages,
                    plugins: config.plugins,
                    presets: config.presets,
                    legacy
                }),
                eslintConfig
            ]
        },
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
    };

    return merge(baseConfig, prodConfig);

};

module.exports = (userOptions) => {

    return [createConfig(userOptions, true), createConfig(userOptions)]

};
