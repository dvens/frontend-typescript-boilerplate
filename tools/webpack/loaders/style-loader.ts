import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import getDefaultMode from '../../utilities/get-default-mode';

const isDevelopment = getDefaultMode() === 'development';

const cssRegex = /\.(css|scss)$/;
const cssModuleRegex = /\.module\.(css|scss)$/;
const cssClientRegex = /\.client\.(css|scss)$/;

type LoaderTypes = {
    [key: string]: any;
};

const configureStyleLoader = (options = {}) => {
    const defaultOptions = Object.assign(
        {},
        {
            isClient: true,
            isLegacy: false,
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
        exclude: [cssModuleRegex, cssClientRegex],
        use: getStyleLoaders(
            {
                modules: false,
            },

            defaultOptions.isClient,
        ),
    };

    const cssClientRules = {
        test: cssClientRegex,
        use: getStyleLoaders(
            {
                modules: false,
                esModule: false,
            },
            false,
        ),
    };

    cssClientRules.use.unshift('to-string-loader');

    return [cssModulesRules, cssRules, cssClientRules];
};

function getStyleLoaders(cssLoaderOptions = {}, extract): any {
    const sourceMap = isDevelopment;
    const styleLoaders = [
        extract && {
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
