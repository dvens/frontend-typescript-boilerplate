import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import getDefaultMode from '../../utilities/get-default-mode';

const isDevelopment = getDefaultMode() === 'development';

const cssRegex = /\.(css|scss|sass)$/;
const cssModuleRegex = /\.module\.(css|scss)$/;

const configureStyleLoader = (options = {}) => {
    const defaultOptions = Object.assign(
        {},
        {
            extract: true,
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
                    exportOnlyLocals: !defaultOptions.isClient,
                },
            },
            defaultOptions.extract,
        ),
    };

    const cssRules = {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders(
            {
                modules: false,
            },
            defaultOptions.extract,
        ),
    };

    return [cssModulesRules, cssRules];
};

function getStyleLoaders(cssLoaderOptions = {}, extract = true) {
    const sourceMap = isDevelopment;
    const styleLoaders = [
        extract && MiniCssExtractPlugin.loader,
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
