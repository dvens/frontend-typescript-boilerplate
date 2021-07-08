const { alias } = require('@dev-scripts/shared');
const { configureBabelLoader, configureStyleLoader } = require('@dev-scripts/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            ...alias,
        };

        config.module.rules = [];

        config.module.rules.push(
            ...configureBabelLoader({
                includedPackages: [/node_modules\/(?!@atomify)/],
                legacy: true,
            }),
        );

        config.module.rules.push(...configureStyleLoader());

        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        );

        return config;
    },
};
