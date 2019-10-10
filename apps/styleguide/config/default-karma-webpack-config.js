const configureBabelLoader = require('./babel-loader');

const configureKarmaWebpack = (transpilePackages = ['@frontend', '@atomify']) => {

    return {
        mode: 'development',
        devtool: 'inline-souce-map',
        module: {
            rules: [configureBabelLoader(transpilePackages)]

        }
    };

};

module.exports = configureKarmaWebpack();
