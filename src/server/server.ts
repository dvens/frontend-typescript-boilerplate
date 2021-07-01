/**
 * @module Application
 * @description The entry point, responsible to bootstrap all pages.
 * @version 1.0.0
 */
// Config/Utilities
import { manifestHelper, devConfig } from '@dev-scripts/shared';

import chalk from 'chalk';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import logger from 'morgan';
import path from 'path';

import { PUBLIC_PATH } from './constants';
// Middleware
import errorHandler from './middleware/errorHandler';
import ssr from './middleware/ssr';

/**
 * Application environment
 *
 * See https://www.npmjs.com/package/dotenv
 */
dotenv.config();

/**
 * Initialize app
 */
const SERVER_PORT = devConfig.port;
const IS_DEV = process.env.NODE_ENV === 'development';

const app: Express = express();

/**
 * Logger
 */
app.use(logger(IS_DEV ? 'dev' : 'prod'));

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
 * Static files
 */
app.use('/static', express.static(PUBLIC_PATH));

/**
 * Error handler
 */
app.use(errorHandler);

/**
 * Manifest
 */

app.use(
    manifestHelper({
        manifestPath: `${PUBLIC_PATH}/asset-manifest.json`,
        cache: !IS_DEV,
    }),
);

/**
 * Service worker
 */
app.get('/sw.js', (_, res) => res.sendFile(path.join(__dirname, '../sw.js')));
app.get('/workbox-*.js', (req, res) => res.sendFile(path.join(__dirname, `..${req.path}`)));

/**
 * Serverside rendering
 */
app.get('*', ssr);

/**
 * Launch server
 */
if (!module.hot) {
    app.listen(SERVER_PORT, () => {
        console.log(
            `[${new Date().toISOString()}]`,
            chalk.blue(`App is running: http://localhost:${SERVER_PORT}`),
        );
    });
}

/**
 * Hot module replacement
 */
if (module.hot) {
    app.hot = module.hot;
    module.hot.accept('@pages/routes');
}

export default app;
