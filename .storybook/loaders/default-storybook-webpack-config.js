const configureCSSLoader = require('./css-loader');
const configureBabelLoader = require('./babel-loader');

module.exports = ({
    config,
    transpilePackages = ['@frontend', '@atomify'],
}) => {

    config.module.rules.push(configureCSSLoader())
    config.module.rules.push(configureBabelLoader(transpilePackages));
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};
