import nodeExternals from 'webpack-node-externals';

// utilities
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

const reStyle = /\.(css|scss|sass)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

export interface ServerBase {
    includedPackages?: string[];
}

export const createServerBaseConfig = (options: ServerBase) => {
    const contenthash = isProduction ? '.[contenthash]' : '';
    const outputFilename = `server${contenthash}.js`;

    const defaultConfig = {
        ...sharedConfig,
        target: 'node',
        name: 'server',
        entry: {
            server: config.serverEntry,
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
            path: config.dist,
            publicPath: config.publicPath,
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

    return defaultConfig;
};
