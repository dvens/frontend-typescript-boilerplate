/**
 * @module Application
 * @description The entry point, responsible to bootstrap all pages.
 * @version 1.0.0
 */
import bodyParser from 'body-parser';
import browserSync from 'browser-sync';
import chalk from 'chalk';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';

import { nunjucksEnvironment } from './nunjucks';
// Config/Utilities
import { config } from '../tools/utilities/get-config';
import { nunjucksConfig } from '../tools/nunjucks/nunjucks-config';
// Middleware
import errorHandler from './middleware/errorHandler';
import hotReloadMiddleware from './middleware/hotReload';
import { webRoutes } from './routes/webRoutes';

/**
 * Application environment
 *
 * See https://www.npmjs.com/package/dotenv
 */
dotenv.config();

/**
 * Initialize app
 */
const SERVER_PORT = config.port;
const app = express();

/**
 * Logger
 */
app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'prod'));

/**
 * Cors
 */
app.use(cors());

/**
 * Compressiom
 * Use gzip compression to decrease the size of
 * the response body and increase the speed of web app
 */
app.use(compression());

/**
 * View templating engine
 */
const appViews = [config.pages, config.components];

nunjucksEnvironment(appViews, nunjucksConfig, app);
app.set('view engine', 'html');

/**
 * Body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Error handler
 */
app.use(errorHandler);

/**
 * Development config
 */
if (process.env.NODE_ENV === 'development') {
    // Static files during development
    app.use('/assets', express.static(config.assets));

    // Enable hot reload when in production mode.
    // And wait until webpack is compiled.
    hotReloadMiddleware(app, () => {
        // Enable browsersync during development
        app.listen(SERVER_PORT - 50, () => {
            browserSync({
                files: config.browserSync,
                notify: true,
                open: false,
                port: SERVER_PORT,
                proxy: `localhost:${SERVER_PORT - 50}`,
                ui: false,
            });

            console.log(
                `[${new Date().toISOString()}]`,
                chalk.bgCyanBright(`App is running: http://localhost:${SERVER_PORT}`),
            );
        });
    });
}

/**
 * Production config
 */
if (process.env.NODE_ENV === 'production') {
    // Static files for production
    app.use('/assets', express.static(`${config.clientDist}/assets`));

    app.listen(SERVER_PORT, () => {
        console.log(
            `[${new Date().toISOString()}]`,
            chalk.blue(`App is running: http://localhost:${SERVER_PORT}`),
        );
    });
}

/**
 * Route Configuration
 */
webRoutes({ routeExtension: '.html', rootFolder: config.pages, app, port: SERVER_PORT });
