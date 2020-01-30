const { config } = require('../../utilities/get-config');

const configureNunjucksLoader = () => {
    return [
        {
            test: /\.njk$/,
            loader: 'nunjucks-loader',
            resolve: {
                modules: [config.components, config.nodeModules],
            },
        },
    ];
};

module.exports = configureNunjucksLoader;
