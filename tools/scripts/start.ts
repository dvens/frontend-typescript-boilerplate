import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import browserSync from 'browser-sync';

// utilities
import getConfig from '../../webpack.config';
import globalConfig from '../utilities/get-config';
import { compilerPromise, logMessage } from '../utilities/compiler-promise';
import { format } from './run';
import path from 'path';

const { config } = globalConfig;

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');
const server = express();

const watchOptions = {
    // ignored: /node_modules/,
};

async function start() {
    const [clientConfig, serverConfig] = webpackConfig;
    const serverEntry = path.resolve(config.serverDist, 'server.js');

    clientConfig.entry.main = [`webpack-hot-middleware/client`, ...clientConfig.entry.main];

    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    const multiCompiler = webpack([clientConfig, serverConfig]);

    const clientModernCompiler: any = multiCompiler.compilers.find(
        (compiler) => compiler.name === 'client',
    );
    const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server');

    const clientModernPromise = compilerPromise('client', clientModernCompiler);
    const serverPromise = compilerPromise('server', serverCompiler);

    server.use(
        webpackDevMiddleware(clientModernCompiler, {
            publicPath: clientConfig.output.publicPath,
            stats: clientConfig.stats,
            serverSideRender: true,
        }),
    );

    server.use(webpackHotMiddleware(clientModernCompiler));

    server.use('/static/', express.static(config.publicPath));

    let appPromise;
    let appPromiseResolve;
    let appPromiseIsResolved = true;
    serverCompiler.hooks.compile.tap('server', () => {
        if (!appPromiseIsResolved) return;
        appPromiseIsResolved = false;
        appPromise = new Promise((resolve) => (appPromiseResolve = resolve));
    });

    let app;

    server.use((req, res) => {
        appPromise.then(() => app.handle(req, res)).catch((error) => console.error(error));
    });

    function checkForUpdate(fromUpdate?: boolean) {
        const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
        if (!app.hot) {
            throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
        }
        if (app.hot.status() !== 'idle') {
            return Promise.resolve();
        }
        return app.hot
            .check(true)
            .then((updatedModules) => {
                if (!updatedModules) {
                    if (fromUpdate) {
                        console.info(`${hmrPrefix}Update applied.`);
                    }
                    return;
                }
                if (updatedModules.length === 0) {
                    console.info(`${hmrPrefix}Nothing hot updated.`);
                } else {
                    console.info(`${hmrPrefix}Updated modules:`);
                    updatedModules.forEach((moduleId) =>
                        console.info(`${hmrPrefix} - ${moduleId}`),
                    );
                    checkForUpdate(true);
                }
            })
            .catch((error) => {
                if (['abort', 'fail'].includes(app.hot.status())) {
                    console.warn(`${hmrPrefix}Cannot apply update.`);
                    delete require.cache[require.resolve(serverEntry)];

                    app = require(serverEntry).default;

                    console.warn(`${hmrPrefix}App has been reloaded.`);
                } else {
                    console.warn(`${hmrPrefix}Update failed: ${error.stack || error.message}`);
                }
            });
    }

    serverCompiler.watch(watchOptions, (error, stats) => {
        if (app && !error && !stats.hasErrors()) {
            checkForUpdate().then(() => {
                appPromiseIsResolved = true;
                appPromiseResolve();
            });
        }
    });

    // wait until client and server is compiled
    try {
        await clientModernPromise;
        await serverPromise;

        const timeStart = new Date();
        console.info(`[${format(timeStart)}] Launching server...`);

        // Load compiled src/server.js as a middleware
        app = require(serverEntry).default;
        appPromiseIsResolved = true;
        appPromiseResolve();

        // Launch the development server with Browsersync and HMR
        await new Promise((resolve, reject) =>
            browserSync.create().init(
                {
                    // https://www.browsersync.io/docs/options
                    server: config.serverEntry,
                    middleware: [server],
                    open: !process.argv.includes('--silent'),
                    ...(config.port ? { port: config.port } : null),
                },
                (error, bs) => (error ? reject(error) : resolve(bs)),
            ),
        );

        const timeEnd = new Date();
        const time = timeEnd.getTime() - timeStart.getTime();
        console.info(`[${format(timeEnd)}] Server launched after ${time} ms`);
    } catch (error) {
        logMessage(error, 'error');
    }
}

export default start;
