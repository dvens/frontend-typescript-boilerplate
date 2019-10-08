const CleanWebpackPlugin = require('clean-webpack-plugin');

// Config
const config = require('../config/config');
const createBaseConfig = require('./base-webpack-config');

// Settings/loaders
const configureBabelLoader = require('./settings/javascript-typescript');

const createConfig = (options, legacy = false) => {

    const baseConfig = createBaseConfig(options, legacy);
    const firstConfig = legacy;


    console.log(baseConfig);

    let modernLegacyConfig = {
        ...baseConfig,
        plugins: [
            firstConfig && new CleanWebpackPlugin(),
        ]
    };

    // Configure babel
    modernLegacyConfig.module.rules.push(configureBabelLoader(config.transpilePackages, config.plugins, config.presets, legacy));
    modernLegacyConfig.resolve.extensions.push('.ts', '.tsx');

    return modernLegacyConfig;

};

module.exports = (userOptions) => {

    return [createConfig(userOptions, true), createConfig(userOptions)]

};
