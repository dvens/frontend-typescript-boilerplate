import TerserPlugin from 'terser-webpack-plugin';

// utilities
import globalConfig from '../utilities/get-config';
import getDefaultMode from '../utilities/get-default-mode';

// Config files
const { config, alias } = globalConfig;

const isVerbose = process.argv.includes('--verbose');

const mode = getDefaultMode();
const isProduction = mode === 'production';

export const sharedConfig = {
    context: config.root,
    mode: mode,
    devtool: !isProduction ? 'cheap-module-source-map' : undefined,
    resolve: {
        alias,
        extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            automaticNameDelimiter: '.',
        },
        minimizer: [
            new TerserPlugin({
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
            }),
        ],
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
