const eslintConfig = {
    enforce: 'pre',
    test: /\.(ts|tsx)?$/,
    loader: require.resolve('eslint-loader'),
    exclude: /node_modules/
}

module.exports = eslintConfig;
