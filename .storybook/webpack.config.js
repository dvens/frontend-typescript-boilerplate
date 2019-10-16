const defaultConfig = require('./loaders/default-storybook-webpack-config');

module.exports = ({
    config
}) => {
    return defaultConfig({
        config
    });
};
