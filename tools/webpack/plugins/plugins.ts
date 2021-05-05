import webpack from 'webpack';
import SassLintPlugin from 'sass-lint-webpack';
import CopyPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

// Utilities
import environment from '../../utilities/env';
import globalConfig from '../../utilities/get-config';

const { config } = globalConfig;

const env = environment();

export const getPlugins = (isClient: boolean = true) => [
    new SassLintPlugin(),
    new CopyPlugin(config.copy || {}),
    new ESLintPlugin({
        emitWarning: true,
        failOnError: true,
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.DefinePlugin({
        __SERVER__: !isClient,
        __BROWSER__: isClient,
    }),
];
