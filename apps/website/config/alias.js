const defaultConfig = require('../config/config');

function setAliasConfig() {
    return {
        '@': defaultConfig.source,
        '@static': defaultConfig.static,
        '@pages': defaultConfig.pages,
        '@server': defaultConfig.server,
    };
}

module.exports = setAliasConfig;
