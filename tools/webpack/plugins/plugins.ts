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

const { config } = globalConfig;

const env = environment();

const mode = getDefaultMode();
const isDevelopment = mode === 'development';

export const getPlugins = (isClient: boolean = true) =>
    [
        isClient && new SassLintPlugin(),
        isClient && !isDevelopment && new CopyPlugin(config.copy || {}),
        isClient &&
            new ESLintPlugin({
                emitWarning: true,
                failOnError: true,
            }),
        isClient &&
            new MiniCssExtractPlugin({
                filename: `${config.cssOutputPath}${
                    isDevelopment ? '[name].css' : '[name].[contenthash].css'
                }`,
                chunkFilename: `${config.cssOutputPath}${
                    isDevelopment ? '[id].css' : '[id].[contenthash].css'
                }`,
            }),
        isClient &&
            new WebpackManifestPlugin({
                fileName: 'asset-manifest.json',
            }),

        new webpack.DefinePlugin(env.stringified),
        new webpack.DefinePlugin({
            __SERVER__: !isClient,
            __BROWSER__: isClient,
        }),
    ].filter(Boolean);
