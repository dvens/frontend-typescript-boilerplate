import webpack from 'webpack';
import SassLintPlugin from 'sass-lint-webpack';
import CopyPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

// Utilities
import environment from '../../utilities/env';
import projectConfig from '../../config/config';
import getDefaultMode from '../../utilities/get-default-mode';
import { normalizePath } from '../../utilities/normalize-path';

const env = environment();

const mode = getDefaultMode();
const isDevelopment = mode === 'development';

export const getPlugins = (isClient: boolean = true, manifestSharedSeed = {}) =>
    [
        isClient && new SassLintPlugin(),
        isClient && projectConfig.copy && new CopyPlugin(projectConfig.copy),
        isClient &&
            new ESLintPlugin({
                emitWarning: true,
                failOnError: true,
            }),
        isClient &&
            new MiniCssExtractPlugin({
                filename: normalizePath(
                    `${projectConfig.cssOutputPath}${
                        isDevelopment ? '[name].css' : '[name].[contenthash].css'
                    }`,
                ),
                chunkFilename: normalizePath(
                    `${projectConfig.cssOutputPath}${
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
