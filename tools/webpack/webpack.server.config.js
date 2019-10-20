const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

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

        target: 'node',

        context: config.root,

        mode: options.mode,

        entry: options.entry,

        devtool: !isProduction ? 'cheap-module-source-map' : undefined,

        externals: [
            nodeExternals({
                // we still want imported css from external files to be bundled otherwise 3rd party packages
                // which require us to include their own css would not work properly
                whitelist: /\.css$/,
            }),
        ],

        plugins: [
            new webpack.DefinePlugin({
                __SERVER__: 'true',
                __BROWSER__: 'false',
            }),
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

        stats: {
            assets: false,
            cached: false,
            cachedAssets: false,
            chunks: false,
            chunkModules: false,
            children: false,
            colors: true,
            hash: false,
            modules: false,
            performance: false,
            reasons: false,
            timings: true,
            version: false,
        },
        node: {
            __dirname: false,
        },
    };

    if (firstConfig) defaultConfig.plugins.push(new CleanWebpackPlugin());

    return defaultConfig;
};

module.exports = createBaseConfig;
