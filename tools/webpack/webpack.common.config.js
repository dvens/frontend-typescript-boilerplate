const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SassLintPlugin = require('sass-lint-webpack');

// Utilities
const {
    config,
    alias
} = require('../utilities/get-config');

const getDefaultMode = require('../utilities/get-default-mode');
const isVerbose = process.argv.includes('--verbose');

// Loaders
const configureBabelLoader = require('../loaders/javascript-typescript');
const eslintConfig = require('../loaders/eslint');
const configureCSSLoader = require('../loaders/style-sass');
const imageLoader = require('../loaders/image-loader');
const fontsLoader = require('../loaders/fonts-loader');

const defaultOptions = {
    mode: getDefaultMode(),
    entry: config.appEntry,
};

const createBaseConfig = (userOptions = {}, legacy = false) => {

    const options = {
        ...defaultOptions,
        ...userOptions
    };

    const firstConfig = legacy;

    const outputFilename = `${legacy ? `${ config.legacyPrefix }` : ''}[name].js`;
    const outputChunkFilename = `${ legacy ? `chunks/${ config.legacyPrefix }` : 'chunks/'}[name].js`;

    const isProduction = options.mode === 'production';

    const defaultConfig = {
        context: config.root,

        mode: options.mode,

        entry: options.entry,

        devtool: !isProduction ? 'cheap-module-source-map' : undefined,

        plugins: [
            new MiniCssExtractPlugin({
                filename: '/assets/css/[name].css',
            }),
            new SassLintPlugin()
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
                eslintConfig,

                //CSS/SASS
                ...configureCSSLoader(),

                //Assets
                imageLoader(),
                fontsLoader()

            ]
        },

        output: {
            filename: outputFilename,
            chunkFilename: outputChunkFilename,
            path: config.dist,
        },

        resolve: {
            alias,
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },

        optimization: {
            splitChunks: {
                chunks: 'async',
                automaticNameDelimiter: '.'
            }
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
