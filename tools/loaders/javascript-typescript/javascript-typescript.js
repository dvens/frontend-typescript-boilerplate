const findSupportedBrowsers = require('../../utilities/get-browser-list');
const getDefaultMode = require('../../utilities/get-default-mode');

const configureBabelLoader = ({
    includedPackages = [],
    plugins = [],
    presets = [],
    legacy = false,
}) => {
    const options = {
        plugins: [
            '@babel/syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            ...plugins,
        ],
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: legacy ? ['ie 11'] : findSupportedBrowsers(),
                    useBuiltIns: false,
                    modules: false,
                    debug: false,
                },
            ],
            ...presets,
        ],
        cacheDirectory: getDefaultMode() === 'development',
    };

    return [
        {
            test: /\.(ts|tsx)?$/,
            exclude: includedPackages,
            use: [
                {
                    loader: require.resolve('babel-loader'),
                    options,
                },
                {
                    loader: require.resolve('ts-loader'),
                },
            ],
        },
        {
            test: /\.(js|jsx)?$/,
            exclude: includedPackages,
            use: [
                {
                    loader: require.resolve('babel-loader'),
                    options,
                },
            ],
        },
    ];
};

module.exports = configureBabelLoader;
