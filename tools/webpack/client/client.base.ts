// utilities
import path from 'path';
import globalConfig from '../../utilities/get-config';
import getDefaultMode from '../../utilities/get-default-mode';
import { normalizePath } from '../../utilities/normalize-path';

// Loaders
import fontsLoader from '../loaders/fonts-loader';
import imageLoader from '../loaders/image-loader';
import configureBabelLoader from '../loaders/javascript-typescript';
import configureStyleLoader from '../loaders/style-loader';

// Plugins
import { getPlugins } from '../plugins/plugins';
import { sharedConfig } from '../shared-config';

// Config files
const { config } = globalConfig;
const isProduction = getDefaultMode() === 'production';

export interface ClientBase {
    legacy?: boolean;
    includedPackages?: string[] | RegExp[];
    manifestSharedSeed?: any;
}

export const createClientBaseConfig = (options: ClientBase) => {
    const contenthash = isProduction ? '.[contenthash]' : '';
    const outputFilename = `${config.jsOutputPath}[name]${contenthash}.js`;
    const outputChunkFilename = `${config.jsOutputPath}${
        options.legacy ? `chunks/${config.legacyPrefix}` : 'chunks/'
    }[name]${contenthash}.js`;

    const entry = options.legacy
        ? {
              [`${config.legacyPrefix}main`]: config.clientEntry,
          }
        : {
              main: config.clientEntry,
          };

    const defaultConfig = {
        ...sharedConfig,
        target: 'web',
        name: options.legacy ? 'legacy-client' : 'client',
        entry,
        plugins: [...getPlugins(true, options.manifestSharedSeed)],
        module: {
            rules: [
                // Javascript/Typescript
                ...configureBabelLoader({
                    includedPackages: options.includedPackages,
                    legacy: options.legacy,
                }),

                //CSS/SASS
                ...configureStyleLoader({
                    isLegacy: options.legacy,
                }),

                //Assets
                imageLoader(),
                fontsLoader(),
            ],
        },
        output: {
            filename: normalizePath(outputFilename),
            chunkFilename: normalizePath(outputChunkFilename),
            path: path.join(config.clientDist, config.publicPath),
            publicPath: config.publicPath,
        },
    };

    return defaultConfig;
};
