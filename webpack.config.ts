import createClientDevConfig from './tools/webpack/client/client.dev';
import createClientProdConfig from './tools/webpack/client/client.prod';
import createServerDevConfig from './tools/webpack/server/server.dev';
import createServerProdConfig from './tools/webpack/server/server.prod';

const clientConfig = {
    // includedPackages: [/node_modules\/(?!@atomify)/],
};

const serverConfig = {
    // includedPackages: [],
};

export default function getConfig(env = 'development') {
    if (env === 'production') {
        // Legacy and normal build and server build
        return [
            createClientProdConfig(clientConfig),
            createClientProdConfig({ ...clientConfig, legacy: true }),
            createServerProdConfig(serverConfig),
        ];
    }
    return [createClientDevConfig(clientConfig), createServerDevConfig(serverConfig)];
}
