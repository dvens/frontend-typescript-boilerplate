const path = require('path');
const defaultConfig = require('../config/config');

function setAliasConfig(config) {
    config.resolve.alias['@'] = defaultConfig.source;
    config.resolve.alias['@static'] = defaultConfig.static;
    config.resolve.alias['@pages'] = defaultConfig.pages;
    config.resolve.alias['@server'] = defaultConfig.server;
}

module.exports = setAliasConfig;
