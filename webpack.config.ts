import createClientDevConfig from './tools/webpack/client/client.dev';
import createServerDevConfig from './tools/webpack/server/server.dev';

const clientConfig = {
    // includedPackages: [/node_modules\/(?!@atomify)/],
};

const serverConfig = {
    // includedPackages: [],
};

export default function getConfig(env = 'development') {
    // if (env === 'production') {
    //     // Legacy and normal build and server build
    //     return [webpackProdConfig(clientConfig, true), webpackProdConfig(clientConfig)];
    // }
    return [createClientDevConfig(clientConfig), createServerDevConfig(serverConfig)];
}
