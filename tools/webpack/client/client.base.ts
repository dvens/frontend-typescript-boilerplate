import TerserPlugin from 'terser-webpack-plugin';

// utilities
import globalConfig from '../../utilities/get-config';
import getDefaultMode from '../../utilities/get-default-mode';
import { normalizePath } from '../../utilities/normalize-path';

// Loaders
import fontsLoader from '../loaders/fonts-loader';
import imageLoader from '../loaders/image-loader';
import configureBabelLoader from '../loaders/javascript-typescript';
import configureStyleLoader from '../loaders/style-loader';

// Plugins
import { getPlugins } from '../plugins/plugins';

// Config files
const { config, alias } = globalConfig;

const isVerbose = process.argv.includes('--verbose');

const mode = getDefaultMode();
const isProduction = mode === 'production';

export const createClientBaseConfig = (options: {
    legacy?: boolean;
    includedPackages?: string[];
}) => {
    const outputFilename = `${config.jsOutputPath}${
        options.legacy ? `${config.legacyPrefix}` : ''
    }[name].[contenthash].js`;
    const outputChunkFilename = `${config.jsOutputPath}${
        options.legacy ? `chunks/${config.legacyPrefix}` : 'chunks/'
    }[name].[contenthash].js`;

    const defaultConfig = {
        target: 'web',
        context: config.root,
        mode: mode,
        entry: config.clientEntry,
        devtool: !isProduction ? 'cheap-module-source-map' : undefined,
        plugins: [...getPlugins()],
        module: {
            rules: [
                // Javascript/Typescript
                ...configureBabelLoader({
                    includedPackages: options.includedPackages,
                    legacy: options.legacy,
                }),

                //CSS/SASS
                ...configureStyleLoader(),

                //Assets
                imageLoader(),
                fontsLoader(),
            ],
        },
        output: {
            filename: normalizePath(outputFilename),
            chunkFilename: normalizePath(outputChunkFilename),
            path: config.clientDist,
            publicPath: config.publicPath,
        },
        resolve: {
            alias,
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', 'json'],
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

    return defaultConfig;
};
