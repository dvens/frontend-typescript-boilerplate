const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getDefaultMode = require('../../utilities/get-default-mode');
const { config } = require('../../utilities/get-config');

const isDevelopment = getDefaultMode() === 'development';

const configureCSSLoader = options => {
    const defaultOptions = Object.assign(
        {},
        {
            extract: true,
        },
        options,
    );

    const extractedCSSConfig = {
        test: /\.(s*)css$/,
        include: /\main.(s*)css$/,
        use: [
            'style-loader',
            !isDevelopment && defaultOptions.extract && MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    sourceMap: isDevelopment,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: isDevelopment,
                    postcssOptions: {
                        path: `${config}/postcss.config.js`,
                    },
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: isDevelopment,
                },
            },
        ].filter(Boolean),
    };

    const cssInJSConfig = {
        test: /\.(s*)css$/,
        exclude: /\main.(s*)css$/,
        use: [
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: isDevelopment,
                    postcssOptions: {
                        path: `${config}/postcss.config.js`,
                    },
                },
            },
            {
                loader: 'clean-css-loader',
                options: {
                    specialComments: 0, // * for keeping all (default), 1 for keeping first one only, 0 for removing all
                    mediaMerging: true, // whether to merge @media blocks (default is true)
                    inline: ['all'], // Inline all @imports, also external urls
                    rebase: false, // set to false to skip URL rebasing
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: isDevelopment,
                },
            },
        ],
    };

    return [extractedCSSConfig, config.cssInJS ? cssInJSConfig : {}];
};

module.exports = configureCSSLoader;
