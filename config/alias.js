const resolveApp = require('../tools/utilities/resolve-app');
const tsconfig = require('../tsconfig.json');

// Get alliases from tsconfig
const aliases = tsconfig.compilerOptions.paths;
const aliasKeys = Object.keys(aliases);

const striptSlashStar = string => string.replace('/*', '');

function setAliasConfig() {

    const webpackAliases = aliasKeys.reduce((obj, key) => {
        const aliasPath = striptSlashStar(aliases[key][0]).replace('./', '');

        obj[striptSlashStar(key)] = resolveApp(aliasPath);

        return obj;

    }, {});

    return webpackAliases;

}

module.exports = setAliasConfig();
