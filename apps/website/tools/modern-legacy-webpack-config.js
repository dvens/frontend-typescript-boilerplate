const CleanWebpackPlugin = require('clean-webpack-plugin');

// Config
const config = require('../config/config');
const createBaseConfig = require('./base-webpack-config');

// Settings/loaders
const configureBabelLoader = require('./settings/javascript-typescript');

const createConfig = (options, legacy = false) => {

    const baseConfig = createBaseConfig(options, legacy);
    const firstConfig = legacy;

    const modernLegacyConfig = {
        ...baseConfig,
        plugins: [
            firstConfig && new CleanWebpackPlugin(),
        ].filter(_ => !!_),
        module: {
            rules: [
                ...configureBabelLoader({
                    transpilePackages: config.transpilePackages,
                    plugins: config.plugins,
                    presets: config.presets,
                    legacy
                })
            ]
        }
    };

    return modernLegacyConfig;

};

module.exports = (userOptions) => {

    return [createConfig(userOptions, true), createConfig(userOptions)]

};
