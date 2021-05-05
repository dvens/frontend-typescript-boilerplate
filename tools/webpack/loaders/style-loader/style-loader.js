const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getDefaultMode = require('../../utilities/get-default-mode');
const { config } = require('../../utilities/get-config');

const isDevelopment = getDefaultMode() === 'development';

const cssRegex = /\.(css|scss|sass)$/;
const cssModuleRegex = /\.module\.(css|scss)$/;

const configureStyleLoader = (options) => {
    const defaultOptions = Object.assign(
        {},
        {
            extract: true,
            isClient: true,
        },
        options,
    );

    const cssModules = {
        test: cssModuleRegex,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: '[local]',
                        mode: 'local',
                    },
                    importLoaders: 2,
                    sourceMap: isDevelopment,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: isDevelopment,
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

    // const cssInJSConfig = {
    //     test: /\.(s*)css$/,
    //     exclude: /\main.(s*)css$/,
    //     use: [
    //         {
    //             loader: 'css-loader',
    //             options: {
    //                 sourceMap: isDevelopment,
    //             },
    //         },
    //         {
    //             loader: 'postcss-loader',
    //             options: {
    //                 sourceMap: isDevelopment,
    //                 postcssOptions: {
    //                     path: `${config}/postcss.config.js`,
    //                 },
    //             },
    //         },
    //         {
    //             loader: 'clean-css-loader',
    //             options: {
    //                 specialComments: 0, // * for keeping all (default), 1 for keeping first one only, 0 for removing all
    //                 mediaMerging: true, // whether to merge @media blocks (default is true)
    //                 inline: ['all'], // Inline all @imports, also external urls
    //                 rebase: false, // set to false to skip URL rebasing
    //             },
    //         },
    //         {
    //             loader: 'sass-loader',
    //             options: {
    //                 sourceMap: isDevelopment,
    //             },
    //         },
    //     ],
    // };

    // return [extractedCSSConfig, config.cssInJS ? cssInJSConfig : {}];

    return [cssModules];
};

module.exports = {
    configureStyleLoader,
};
