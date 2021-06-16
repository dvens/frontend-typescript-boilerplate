import { PolyfillLoader } from './../types/config.types';
import fs from 'fs';
import { lookup } from './manifest-helper';
import projectConfig from '../config/config';
import { createDevLoaderScript, createProdLoaderScript } from './polyfills/loader-script';

let polyfillManifest: any = null;

function getPolyfillManifest(dir: string) {
    if (polyfillManifest) return polyfillManifest;

    try {
        return JSON.parse(fs.readFileSync(dir, 'utf8'));
    } catch (err) {
        throw new Error('Polyfill Manifest could not be loaded.');
    }
}

export const getScripts = async (isDebug: boolean) => {
    const polyfillConfig: PolyfillLoader = {
        polyfillsDir: `${projectConfig.clientDist}`,
        manifestDir: `${projectConfig.clientDist}${projectConfig.publicPath}`,
        relativePathToPolyfills: `${projectConfig.clientDist}${projectConfig.publicPath}`,
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
        polyfills: {
            coreJs: true,
            regeneratorRuntime: true,
            minify: true,
            hash: true,
        },
    };

    if (isDebug) {
        const { scripts } = createDevLoaderScript(polyfillConfig);
        return { scripts, code: null };
    } else {
        const manifest = getPolyfillManifest(
            `${polyfillConfig.manifestDir}polyfills-manifest.json`,
        );
        const { polyfills, code } = await createProdLoaderScript(
            { ...polyfillConfig, ...manifest },
            manifest.generatedPolyfills,
        );

        return { scripts: polyfills, code };
    }
};
