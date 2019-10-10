const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const config = require('../config/config');
const getDefaultMode = require('./utilities/get-default-mode.js');
const setAliasConfig = require('../config/alias');

const defaultOptions = {
    mode: getDefaultMode(),
    entry: config.appEntry,
};

const createBaseConfig = (userOptions = {}, legacy = false) => {

    const options = {
        ...defaultOptions,
        ...userOptions
    };

    const production = options.mode === 'production';

    const outputFilename = `${legacy ? `${ config.legacyPrefix }` : ''}[name].js`;
    const outputChunkFilename = `${ legacy ? `chunks/${ config.legacyPrefix }` : 'chunks/'}[name].js`;

    const defaultConfig = {

        mode: options.mode,

        entry: options.entry,

        devtool: config.sourceMap ? 'cheap-module-source-map' : undefined,

        output: {
            filename: outputFilename,
            chunkFilename: outputChunkFilename,
            path: config.dist,
        },

        resolve: {
            alias: setAliasConfig(),
            extensions: ['.ts', '.tsx']
        },

        optimization: {
            splitChunks: {
                chunks: 'async',
                automaticNameDelimiter: '.'
            },
            minimizer: [
                production &&
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
            ].filter(_ => !!_)
        }
    };

    return defaultConfig;
};

module.exports = createBaseConfig;
