import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import getDefaultMode from '../../utilities/get-default-mode';

const isDevelopment = getDefaultMode() === 'development';

const cssRegex = /\.(css|scss|sass)$/;
const cssModuleRegex = /\.module\.(css|scss)$/;

const configureStyleLoader = (options = {}) => {
    const defaultOptions = Object.assign(
        {},
        {
            isClient: true,
        },
        options,
    );

    const cssModulesRules = {
        test: cssModuleRegex,
        use: getStyleLoaders(
            {
                modules: {
                    localIdentName: '[local]',
                    mode: 'local',
                    exportGlobals: true,
                    exportOnlyLocals: !defaultOptions.isClient,
                },
            },
            defaultOptions.isClient,
        ),
    };

    const cssRules = {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders(
            {
                modules: false,
            },
            defaultOptions.isClient,
        ),
    };

    return [cssModulesRules, cssRules];
};

function getStyleLoaders(cssLoaderOptions = {}, isClient = true) {
    const sourceMap = isDevelopment;
    const styleLoaders = [
        isClient && {
            loader: MiniCssExtractPlugin.loader,
            options: {
                esModule: false,
            },
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap,
                importLoaders: 2,
                ...cssLoaderOptions,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap,
            },
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap,
            },
        },
    ].filter(Boolean);

    return styleLoaders;
}

export default configureStyleLoader;
