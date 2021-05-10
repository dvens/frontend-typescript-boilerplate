import path from 'path';

import { Config, PolyfillLoader } from './../types/config.types';

const projectDirectory = process.env.OLDPWD || path.normalize(process.env.INIT_CWD || '');

interface GlobalConfig {
    config: Config;
    alias: any;
    // favicon: any;
    // polyfillLoader: PolyfillLoader;
}

const globalConfig: GlobalConfig = {
    config: require(`${projectDirectory}/config/config.ts`).default,
    alias: require(`${projectDirectory}/config/alias.ts`).default,
    // favicon: require(`${projectDirectory}/config/favicons.ts`).default || {},
    // polyfillLoader: require(`${projectDirectory}/config/polyfills.ts`).default || {},
};

export default globalConfig;
