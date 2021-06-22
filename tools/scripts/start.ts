import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import browserSync from 'browser-sync';
import path from 'path';

// utilities
import getConfig from '../../webpack.config';

import { createCompilationPromise, logMessage } from '../utilities/compiler-promise';
import projectConfig from '../config/config';

const browserSyncServer = browserSync.create();

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');
const server = express();

const watchOptions = {
    // ignored: /node_modules/,
};

async function start() {
    const [clientConfig, serverConfig] = webpackConfig;
    const serverEntry = path.resolve(projectConfig.serverDist, 'server.js');

    clientConfig.entry.main = [`webpack-hot-middleware/client`, ...clientConfig.entry.main];

    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    const multiCompiler = webpack([clientConfig, serverConfig]);

    const clientModernCompiler: any = multiCompiler.compilers.find(
        (compiler) => compiler.name === 'client',
    );
    const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server');

    const clientModernPromise = createCompilationPromise(
        'client',
        clientModernCompiler,
        clientConfig.stats,
    );
    const serverPromise = createCompilationPromise('server', serverCompiler, serverConfig.stats);

    server.use(
        webpackDevMiddleware(clientModernCompiler, {
            publicPath: clientConfig.output.publicPath,
            stats: clientConfig.stats,
            serverSideRender: true,
        }),
    );

    server.use(webpackHotMiddleware(clientModernCompiler));

    server.use(projectConfig.publicPath, express.static(projectConfig.publicPath));

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
                        logMessage(`${hmrPrefix}Update applied.`, 'info');
                    }
                    return;
                }
                if (updatedModules.length === 0) {
                    logMessage(`${hmrPrefix}Nothing hot updated.`, 'info');
                } else {
                    logMessage(`${hmrPrefix}Updated modules:`, 'info');
                    updatedModules.forEach((moduleId) =>
                        logMessage(`${hmrPrefix} - ${moduleId}`, 'info'),
                    );
                    checkForUpdate(true);
                }
            })
            .catch((error) => {
                if (['abort', 'fail'].includes(app.hot.status())) {
                    logMessage(`${hmrPrefix}Cannot apply update.`, 'warning');
                    delete require.cache[require.resolve(serverEntry)];

                    app = require(serverEntry).default;

                    logMessage(`${hmrPrefix}App has been reloaded.`, 'warning');
                } else {
                    logMessage(
                        `${hmrPrefix}Update failed: ${error.stack || error.message}`,
                        'warning',
                    );
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

    // Wait until client and server are compiled
    try {
        await clientModernPromise;
        await serverPromise;

        logMessage('Launching server...', 'info');

        // Load compiled src/server.js as a middleware
        app = require(serverEntry).default;
        appPromiseIsResolved = true;
        appPromiseResolve();

        // Launch the development server with Browsersync and HMR
        await new Promise((resolve, reject) =>
            browserSyncServer.init(
                {
                    // https://www.browsersync.io/docs/options
                    server: projectConfig.serverEntry,
                    middleware: [server],
                    open: false,
                    ...(projectConfig.port ? { port: projectConfig.port } : null),
                    files: [
                        {
                            match: ['src/pages/_document.tsx', 'src/pages/_app.tsx'],
                            fn: function () {
                                browserSyncServer.reload();
                            },
                        },
                    ],
                },

                (error, bs) => (error ? reject(error) : resolve(bs)),
            ),
        );

        logMessage(`Server launched!`, 'info');
    } catch (error) {
        logMessage(error, 'error');
    }
}

export default start;
