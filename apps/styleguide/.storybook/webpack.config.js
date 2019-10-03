const defaultConfig = require('../config/default-storybook-webpack-config');

module.exports = ({
    config
}) => {
    return defaultConfig({
        config
    });
};
