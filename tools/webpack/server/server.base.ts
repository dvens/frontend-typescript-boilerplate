import nodeExternals from 'webpack-node-externals';

// utilities
import defaultConfig from '../../config/config';

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

const reStyle = /\.(css|scss|sass)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

export interface ServerBase {
    includedPackages?: string[];
}

export const createServerBaseConfig = (options: ServerBase) => {
    const outputFilename = `server.js`;

    const config = {
        ...sharedConfig,
        target: 'node',
        name: 'server',
        entry: {
            server: defaultConfig.serverEntry,
        },
        plugins: [...getPlugins(false)],
        module: {
            rules: [
                // Javascript/Typescript
                ...configureBabelLoader({
                    includedPackages: options.includedPackages,
                    legacy: false,
                }),

                //CSS/SASS
                ...configureStyleLoader({
                    isClient: false,
                }),

                //Assets
                imageLoader(false),
                fontsLoader(false),
            ],
        },
        output: {
            filename: normalizePath(outputFilename),
            libraryTarget: 'commonjs2',
            path: defaultConfig.serverDist,
            publicPath: defaultConfig.publicPath,
        },
        node: {
            __filename: false,
            __dirname: false,
        },
        externals: [
            './asset-manifest.json',
            nodeExternals({
                allowlist: [reStyle, reImage],
            }),
        ],
    };

    return config;
};
