import path from 'path';

import { Config, PolyfillLoader } from './../types/config.types';

const projectDirectory = process.env.OLDPWD || path.normalize(process.env.INIT_CWD || '');

const configString = `${projectDirectory}/config/config.ts`;
const aliasString = `${projectDirectory}/config/alias.ts`;
const faviconString = `${projectDirectory}/config/favicons.ts`;
const polyfillString = `${projectDirectory}/config/polyfills.ts`;

interface GlobalConfig {
    config: Config;
    alias: any;
    favicon: any;
    polyfillLoader: PolyfillLoader;
}

const globalConfig: GlobalConfig = {
    config: require(configString).default,
    alias: require(aliasString).default,
    favicon: require(faviconString).default,
    polyfillLoader: require(polyfillString).default,
};

export default globalConfig;
