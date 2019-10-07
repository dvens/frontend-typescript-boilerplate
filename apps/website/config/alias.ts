const path = require('path');

function setAliasConfig(config) {
    config.resolve.alias['@'] = path.join(process.cwd(), 'src');
    config.resolve.alias['@static'] = path.join(process.cwd(), 'static');
    config.resolve.alias['@pages'] = path.join(process.cwd(), 'pages');
    config.resolve.alias['@server'] = path.join(process.cwd(), 'server');
}

module.exports = {
    setAliasConfig,
};
