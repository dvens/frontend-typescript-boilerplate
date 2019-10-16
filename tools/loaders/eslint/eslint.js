const eslintConfig = {
    enforce: 'pre',
    test: /\.(ts|js)x?$/,
    loader: require.resolve('eslint-loader'),
    exclude: /node_modules/
}

module.exports = eslintConfig;
