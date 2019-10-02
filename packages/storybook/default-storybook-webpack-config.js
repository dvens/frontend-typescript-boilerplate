module.exports = ({
    config,
    transpilePackages = []
}) => {


    // const options = {
    //     plugins: [
    //         '@babel/syntax-dynamic-import',
    //         '@babel/plugin-proposal-class-properties',
    //         '@babel/plugin-proposal-object-rest-spread',
    //         ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    //         "@babel/plugin-syntax-jsx",
    //         ["@babel/plugin-transform-react-jsx", { "pragma": "h" }]
    //     ],
    //     presets: [
    //         ['@babel/preset-env', {
    //             useBuiltIns: 'usage',
    //             modules: false,
    //             corejs: 3,
    //             targets: {
    //                 browsers: [
    //                     '> 1%',
    //                     'last 2 versions',
    //                     'Firefox ESR',
    //                     "ie >= 11"
    //                 ]
    //             },
    //         }],
    //     ],
    // };

    // config.module.rules.push({
    //     test: /\.(ts|tsx)$/,
    //     loader: require.resolve('babel-loader'),
    //     options: {
    //         presets: [
    //             [
    //                 '@babel/preset-env',
    //                 { targets: { browsers: ['> 1%', 'last 2 versions', 'ie 11'] } }, // or whatever your project requires
    //             ],
    //             [
    //                 '@babel/preset-typescript',
    //                 {
    //                     isTSX: true,
    //                     allExtensions: true
    //                 }
    //             ],
    //             '@babel/preset-react',
    //         ],

    //         plugins: [
    //             [
    //               require.resolve('babel-plugin-named-asset-import'),
    //               {
    //                 loaderMap: {
    //                   svg: {
    //                     ReactComponent:
    //                       '@svgr/webpack?-prettier,-svgo![path]',
    //                   },
    //                 },
    //               },
    //             ],
    //             '@babel/plugin-syntax-dynamic-import', // to allow import() syntax
    //             ['@babel/plugin-proposal-decorators', { legacy: true }],
    //             ['@babel/plugin-proposal-class-properties', { loose: true }],
    //         ]
    //     }
    // });

    // config.resolve.extensions.push('.ts', '.tsx');



    // this is a separate config for only those packages
    // the main storybook will use the .babelrc which is needed so storybook itself works in IE
    config.module.rules.push({
        test: new RegExp(`node_modules(\\/|\\\\)(${transpilePackages.join('|')})(.*)\\.ts$`),
        use: {
            loader: 'babel-loader',
            options: {
                plugins: [
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-proposal-object-rest-spread',
                ],
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            useBuiltIns: 'entry',
                            corejs: '2',
                        },
                    ],
                ],
                babelrc: false,
            },
        },
    });

    return config;
};
