const path = require('path');
const fs = require('fs');

const projectDirectory = process.env.OLDPWD || path.normalize(process.env.INIT_CWD);

const getConfig = () => {
    const configString = `${projectDirectory}/config/config.js`;
    const aliasString = `${projectDirectory}/config/alias.js`;
    const faviconString = `${projectDirectory}/config/favicons.js`;

    if (!fs.existsSync(configString))
        throw new Error(
            'Please create a config.js inside config folder on the root of your project',
        );

    return {
        config: require(configString),
        alias: require(aliasString),
        favicon: require(faviconString),
    };
};

module.exports = getConfig();
