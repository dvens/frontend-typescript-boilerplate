import { lookup } from './manifest-helper';
import { projectDirectory } from '../config/config';
import defaultConfig from '../config/config';

let config = {};

try {
    // TODO: Change this into getting polyfill-manifest.json
    config = require(`${projectDirectory}/config/polyfills.config.js`)(defaultConfig);
} catch (e) {
    /** noop */
}

export const Scripts = () => {
    const defaultConfig = {
        modern: {
            files: [{ path: lookup('main.js') }],
        },
        legacy: {
            test: "'noModule' in HTMLScriptElement.prototype",
            files: [
                {
                    path: lookup('legacy-main.js'),
                },
            ],
        },
        ...config,
    };
    console.log();

    return null;
};
