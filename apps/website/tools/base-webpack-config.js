const TerserPlugin = require('terser-webpack-plugin');

const config = require('../config/config');
const getDefaultMode = require('./utilities/get-default-mode.js');
const setAliasConfig = require('../config/alias');

const defaultOptions = {
    mode: getDefaultMode(),
    input: config.appEntry,
};

const createBaseConfig = (userOptions = {}, legacy = false) => {

    const options = {
        ...userOptions,
        ...defaultOptions
    };

    const production = options.mode === 'production';

    if (options.entry) {
        console.warn('Options.entry is deprecated, Use options,input instead');
    }

    const outputFilename = `${legacy ? `${ config.legacyPrefix }` : ''}[name].js`;
    const outputChunkFilename = `${ legacy ? `chunks/${ config.legacyPrefix }` : '/chunks'}[name].js`;

    let defaultConfig = {
        context: config.root,

        mode: options.mode,

        entry: config.appEntry,

        devtool: config.sourceMap ? 'cheap-module-source-map' : undefined,

        output: {
            filename: outputFilename,
            chunkFilename: outputChunkFilename,
            path: config.dist,
        },

        resolve: {
            alias: [],
            extensions: [],
        },

        module: {
            rules: [],
        },

        optimization: {
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
            ],
        }
    };

    setAliasConfig(defaultConfig);

    return defaultConfig;
};

module.exports = createBaseConfig;
