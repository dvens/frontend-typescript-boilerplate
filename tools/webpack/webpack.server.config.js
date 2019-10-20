// Utilities
const {
    config,
    alias
} = require('../utilities/get-config');

const getDefaultMode = require('../utilities/get-default-mode');

// Loaders
const configureBabelLoader = require('../loaders/javascript-typescript');
const eslintConfig = require('../loaders/eslint');

const defaultOptions = {
    mode: getDefaultMode(),
    entry: config.appEntry,
};

const createBaseConfig = (userOptions = {}) => {

    const options = {
        ...defaultOptions,
        ...userOptions
    };

    const firstConfig = legacy;

    const outputFilename = `${config.jsOutputPath}${legacy ? `${ config.legacyPrefix }` : ''}[name].js`;

    const isProduction = options.mode === 'production';

    const defaultConfig = {

        target: 'web',

        context: config.root,

        mode: options.mode,

        entry: options.entry,

        devtool: !isProduction ? 'cheap-module-source-map' : undefined,

        plugins: [

        ],

        module: {
            rules: [

                // Javascript/Typescript
                ...configureBabelLoader({
                    includedPackages: options.includedPackages,
                    plugins: options.babelLoaderPlugins,
                    presets: options.babelLoaderPresets,
                    legacy
                }),
                eslintConfig
            ]
        },

        output: {
            filename: outputFilename,
            path: config.dist,

        },

        resolve: {
            alias,
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },

        // Don't attempt to continue if there are any errors.
        bail: isProduction,

        cache: !isProduction,

        // Specify what bundle information gets displayed
        // https://webpack.js.org/configuration/stats/
        stats: {
            cached: isVerbose,
            cachedAssets: isVerbose,
            chunks: isVerbose,
            chunkModules: isVerbose,
            colors: true,
            hash: isVerbose,
            modules: isVerbose,
            reasons: !isProduction,
            timings: true,
            version: isVerbose,
        },
    };

    if (firstConfig) defaultConfig.plugins.push(new CleanWebpackPlugin());

    return defaultConfig;
};

module.exports = createBaseConfig;
