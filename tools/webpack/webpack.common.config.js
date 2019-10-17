const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('../../config/config');
const getDefaultMode = require('../utilities/get-default-mode');
const setAliasConfig = require('../../config/alias');

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

    const defaultConfig = {
        context: config.root,

        mode: options.mode,

        entry: options.entry,

        devtool: config.sourceMap ? 'cheap-module-source-map' : undefined,

        plugins: [],

        output: {
            filename: outputFilename,
            chunkFilename: outputChunkFilename,
            path: config.dist,
        },

        resolve: {
            alias: setAliasConfig(),
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },

        optimization: {
            splitChunks: {
                chunks: 'async',
                automaticNameDelimiter: '.'
            }
        }
    };

    if (firstConfig) defaultConfig.plugins.push(new CleanWebpackPlugin());

    return defaultConfig;
};

module.exports = createBaseConfig;
