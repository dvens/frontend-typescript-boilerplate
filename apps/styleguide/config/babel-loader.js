const options = {
    plugins: [
        '@babel/syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-jsx',
        ['@babel/plugin-transform-react-jsx', {
            "pragma": "h"
        }]
    ],
    presets: [
        ['@babel/preset-env', {
            targets: {
                browsers: ['> 1%', 'last 2 versions', 'ie 11']
            },
        }],
    ],
};

module.exports = configureBabelLoader = (transpilePackages = []) => {

    return {
        test: [/\.(ts|tsx)$/, new RegExp(`node_modules(\\/|\\\\)(${transpilePackages.join('|')})(.*)\\.js$`)],
        use: [{
            loader: require.resolve('babel-loader'),
            options
        }, {
            loader: require.resolve('ts-loader'),
        }],
    };

};
