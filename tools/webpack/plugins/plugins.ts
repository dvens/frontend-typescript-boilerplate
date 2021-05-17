import webpack from 'webpack';
import SassLintPlugin from 'sass-lint-webpack';
import CopyPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

// Utilities
import environment from '../../utilities/env';
import globalConfig from '../../utilities/get-config';
import getDefaultMode from '../../utilities/get-default-mode';
import { normalizePath } from '../../utilities/normalize-path';

const { config } = globalConfig;

const env = environment();

const mode = getDefaultMode();
const isDevelopment = mode === 'development';

export const getPlugins = (isClient: boolean = true, manifestSharedSeed = {}) =>
    [
        isClient && new SassLintPlugin(),
        isClient && new CopyPlugin(config.copy || {}),
        isClient &&
            new ESLintPlugin({
                emitWarning: true,
                failOnError: true,
            }),
        isClient &&
            new MiniCssExtractPlugin({
                filename: normalizePath(
                    `${config.cssOutputPath}${
                        isDevelopment ? '[name].css' : '[name].[contenthash].css'
                    }`,
                ),
                chunkFilename: normalizePath(
                    `${config.cssOutputPath}${
                        isDevelopment ? '[id].css' : '[id].[contenthash].css'
                    }`,
                ),
            }),
        isClient &&
            new WebpackManifestPlugin({
                fileName: 'asset-manifest.json',
                seed: manifestSharedSeed,
                writeToFileEmit: true,
            }),

        new webpack.DefinePlugin(env.stringified),
        new webpack.DefinePlugin({
            __SERVER__: !isClient,
            __BROWSER__: isClient,
        }),
    ].filter(Boolean);