import { projectDirectory } from './config';
import resolveApp from '../utilities/resolve-app';

const striptSlashStar = (string) => string.replace('/*', '');

let aliases = {};

try {
    // Get alliases from tsconfig
    const tsconfig = require(`${projectDirectory}/tsconfig.json`);
    aliases = tsconfig.compilerOptions.paths;
} catch (e) {}

function setAliasConfig() {
    const aliasKeys = Object.keys(aliases);
    const webpackAliases = aliasKeys.reduce((obj, key) => {
        const aliasPath = striptSlashStar(aliases[key][0]).replace('./', '');

        obj[striptSlashStar(key)] = resolveApp(aliasPath);

        return obj;
    }, {});

    return webpackAliases;
}

export default setAliasConfig();
