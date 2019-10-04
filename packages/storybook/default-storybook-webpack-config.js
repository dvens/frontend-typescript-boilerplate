const configureCSSLoader = require('@frontend/css-loader');
const configureBabelLoader = require('@frontend/babel-loader');

const defaultStorybookWebpackConfig = ({
    config,
    transpilePackages = ['@frontend', '@atomify'],
}) => {

    config.module.rules.push(configureCSSLoader())
    config.module.rules.push(configureBabelLoader(transpilePackages));
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};

module.exports = defaultStorybookWebpackConfig;
