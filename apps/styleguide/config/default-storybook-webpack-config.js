module.exports = ({
    config,
    transpilePackages = ['@frontend', '@atomify'],
}) => {

    const options = {
        plugins: [
            '@babel/syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            "@babel/plugin-syntax-jsx",
            ["@babel/plugin-transform-react-jsx", {
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

    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        exclude: new RegExp(`/node_modules\/(?!${transpilePackages.join("|")})/`),
        use: [{
            loader: require.resolve('babel-loader'),
            options
        }, {
            loader: require.resolve('ts-loader'),
        }],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};
