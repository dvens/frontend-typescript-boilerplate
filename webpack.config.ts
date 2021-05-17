import createClientDevConfig from './tools/webpack/client/client.dev';
import createClientProdConfig from './tools/webpack/client/client.prod';
import createServerDevConfig from './tools/webpack/server/server.dev';
import createServerProdConfig from './tools/webpack/server/server.prod';

const clientConfig = {
    includedPackages: [/node_modules\/(?!@atomify)/],
    // Shared seed is being used for the asset-manifest.json. And only used when there are multiple webpack configurations.
    // https://medium.com/@technoblogueur/webpack-one-manifest-json-from-multiple-configurations-output-fee48578eb92
    manifestSharedSeed: {},
};

const serverConfig = {
    // includedPackages: [],
};

function getConfig(env = 'development') {
    if (env === 'production') {
        return [
            // Client modern build
            createClientProdConfig(clientConfig),
            // Client legacy build
            createClientProdConfig({ ...clientConfig, legacy: true }),
            // Server build
            createServerProdConfig(serverConfig),
        ];
    }
    return [createClientDevConfig(clientConfig), createServerDevConfig(serverConfig)];
}

export default getConfig;
