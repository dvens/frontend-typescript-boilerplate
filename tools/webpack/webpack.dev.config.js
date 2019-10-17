const merge = require('webpack-merge');

// Config
const config = require('../../config/config');
const createBaseConfig = require('./webpack.common.config');

// Settings/loaders
const configureBabelLoader = require('../loaders/javascript-typescript');
const eslintConfig = require('../loaders/eslint');

const createConfig = (options, legacy = false) => {

    const baseConfig = createBaseConfig(options, legacy);

    const devConfig = {
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
        }
    };

    return merge(baseConfig, devConfig);

};

module.exports = (userOptions) => {

    // Uncomment: if you want to run legacy and modern in dev mode.
    // return [createConfig(userOptions, true), createConfig(userOptions)];

    // By default legacy is running in dev mode.
    return [createConfig(userOptions, true)];

};
