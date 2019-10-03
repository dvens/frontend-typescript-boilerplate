module.exports = ({
    config,
    transpilePackages = ['@frontend', '@atomify'],
}) => {

    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        exclude: new RegExp(`/node_modules\/(?!${transpilePackages.join("|")})/`),
        options: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            browsers: ['> 1%', 'last 2 versions', 'ie 11']
                        }
                    },
                ],
                [
                    '@babel/preset-typescript',
                    {
                        isTSX: true,
                        allExtensions: true
                    }
                ]
            ],

            plugins: [
                '@babel/plugin-syntax-dynamic-import', // to allow import() syntax
                ['@babel/plugin-proposal-decorators', {
                    legacy: true
                }],
                ['@babel/plugin-proposal-class-properties', {
                    loose: true
                }],
                '@babel/plugin-proposal-object-rest-spread',
                "@babel/plugin-syntax-jsx",
                ["@babel/plugin-transform-react-jsx", {
                    "pragma": "h"
                }]
            ]
        }
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};
