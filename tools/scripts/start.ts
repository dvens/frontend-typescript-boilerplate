import webpack from 'webpack';
import nodemon from 'nodemon';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// utilities
import getConfig from '../../webpack.config';
import globalConfig from '../utilities/get-config';
import { compilerPromise, logMessage } from '../utilities/compiler-promise';

const { config } = globalConfig;

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');
const app = express();

const WEBPACK_PORT =
    process.env.WEBPACK_PORT || (!isNaN(Number(config)) ? Number(config) + 1 : 3001);

const DEVSERVER_HOST = process.env.DEVSERVER_HOST || 'http://localhost';

async function start() {
    const [clientConfig, serverConfig] = webpackConfig;

    clientConfig.entry.main = [
        `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
        ...clientConfig.entry.main,
    ];

    clientConfig.output.publicPath = [`${DEVSERVER_HOST}:${WEBPACK_PORT}`, config.publicPath]
        .join('/')
        .replace(/([^:+])\/+/g, '$1/');

    serverConfig.output.publicPath = [`${DEVSERVER_HOST}:${WEBPACK_PORT}`, config.publicPath]
        .join('/')
        .replace(/([^:+])\/+/g, '$1/');

    const multiCompiler = webpack([clientConfig, serverConfig]);

    const clientModernCompiler: any = multiCompiler.compilers.find(
        (compiler) => compiler.name === 'client',
    );
    const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server');

    const clientModernPromise = compilerPromise('client', clientModernCompiler);
    const serverPromise = compilerPromise('server', serverCompiler);

    const watchOptions = {
        ignored: /node_modules/,
        stats: clientConfig.stats,
    };

    app.use((_req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        return next();
    });

    app.use(
        webpackDevMiddleware(clientModernCompiler, {
            publicPath: clientConfig.output.publicPath,
            stats: clientConfig.stats,
            serverSideRender: true,
        }),
    );

    app.use(webpackHotMiddleware(clientModernCompiler));

    app.use('/static/', express.static(config.publicPath));

    app.listen(WEBPACK_PORT);

    serverCompiler.watch(watchOptions, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(serverConfig.stats));
            return;
        }

        if (error) {
            logMessage(error, 'error');
        }

        if (stats.hasErrors()) {
            const info = stats.toJson();
            const errors = info.errors[0].split('\n');
            logMessage(errors[0], 'error');
            logMessage(errors[1], 'error');
            logMessage(errors[2], 'error');
        }
    });

    // wait until client and server is compiled
    try {
        await clientModernPromise;
        await serverPromise;
    } catch (error) {
        logMessage(error, 'error');
    }

    const script = nodemon({
        script: `${config.serverDist}/server.js`,
        ignore: ['src', 'tools', 'config', './*.*', 'build/static'],
        delay: 200,
    });

    script.on('restart', () => {
        logMessage('Server side app has been restarted.', 'warning');
    });

    script.on('quit', () => {
        console.log('Process ended');
        process.exit();
    });

    script.on('error', () => {
        logMessage('An error occured. Exiting', 'error');
        process.exit(1);
    });
}

export default start;
