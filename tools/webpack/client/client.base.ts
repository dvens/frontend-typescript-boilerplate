// utilities
import path from 'path';
import getDefaultMode from '../../utilities/get-default-mode';
import { normalizePath } from '../../utilities/normalize-path';
import projectConfig from '../../config/config';

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
    const outputFilename = `${projectConfig.jsOutputPath}[name]${contenthash}.js`;
    const outputChunkFilename = `${projectConfig.jsOutputPath}${
        options.legacy ? `chunks/${projectConfig.legacyPrefix}` : 'chunks/'
    }[name]${contenthash}.js`;

    const entry = options.legacy
        ? {
              [`${projectConfig.legacyPrefix}main`]: projectConfig.clientEntry,
          }
        : {
              main: projectConfig.clientEntry,
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
            path: path.join(projectConfig.clientDist, projectConfig.publicPath),
            publicPath: projectConfig.publicPath,
        },
    };

    return config;
};
