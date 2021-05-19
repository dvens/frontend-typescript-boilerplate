// utilities
import path from 'path';
import getDefaultMode from '../../utilities/get-default-mode';
import { normalizePath } from '../../utilities/normalize-path';
import defaultConfig from '../../config/config';

// Loaders
import fontsLoader from '../loaders/fonts-loader';
import imageLoader from '../loaders/image-loader';
import configureBabelLoader from '../loaders/javascript-typescript';
import configureStyleLoader from '../loaders/style-loader';

// Plugins
import { getPlugins } from '../plugins/plugins';
import { sharedConfig } from '../shared-config';

// Config files
const isProduction = getDefaultMode() === 'production';

export interface ClientBase {
    legacy?: boolean;
    includedPackages?: string[] | RegExp[];
    manifestSharedSeed?: any;
}

export const createClientBaseConfig = (options: ClientBase) => {
    const contenthash = isProduction ? '.[contenthash]' : '';
    const outputFilename = `${defaultConfig.jsOutputPath}[name]${contenthash}.js`;
    const outputChunkFilename = `${defaultConfig.jsOutputPath}${
        options.legacy ? `chunks/${defaultConfig.legacyPrefix}` : 'chunks/'
    }[name]${contenthash}.js`;

    const entry = options.legacy
        ? {
              [`${defaultConfig.legacyPrefix}main`]: defaultConfig.clientEntry,
          }
        : {
              main: defaultConfig.clientEntry,
          };

    const config = {
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
                ...configureStyleLoader(),

                //Assets
                imageLoader(),
                fontsLoader(),
            ],
        },
        output: {
            filename: normalizePath(outputFilename),
            chunkFilename: normalizePath(outputChunkFilename),
            path: path.join(defaultConfig.clientDist, defaultConfig.publicPath),
            publicPath: defaultConfig.publicPath,
        },
    };

    return config;
};
