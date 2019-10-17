const findSupportedBrowsers = require('../../utilities/get-browser-list');
const getDefaultMode = require('../../utilities/get-default-mode');

const configureBabelLoader = ({
    transpilePackages = [],
    plugins = [],
    presets = [],
    legacy = false
}) => {

    const options = {
        plugins: [
            '@babel/syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            ...plugins,
        ],
        presets: [
            ['@babel/preset-env', {
                targets: legacy ? ['ie 11'] : findSupportedBrowsers(),
                useBuiltIns: false,
                modules: false,
                debug: false,
            }],
            ...presets,
        ],
        cacheDirectory: getDefaultMode() === 'development',
    };

    return [{
        test: /\.(ts|js)x?$/,
        exclude: new RegExp(`/node_modules\/(?!${transpilePackages.join('|')})/`),
        use: [{
            loader: require.resolve('babel-loader'),
            options
        }, {
            loader: require.resolve('ts-loader'),
        }],
    }];

};

module.exports = configureBabelLoader;
