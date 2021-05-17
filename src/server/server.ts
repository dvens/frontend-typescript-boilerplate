/**
 * @module Application
 * @description The entry point, responsible to bootstrap all pages.
 * @version 1.0.0
 */
import chalk from 'chalk';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import logger from 'morgan';
import path from 'path';

// Config/Utilities
import defaultConfig from '../../tools/config/config';
import manifestHelper from '../../tools/utilities/manifest-helper';
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
const SERVER_PORT = defaultConfig.port;
const IS_DEV = process.env.NODE_ENV === 'development';

const app: Express = express();
const publicPath = path.join(defaultConfig.clientDist, defaultConfig.publicPath);

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
app.use(defaultConfig.publicPath, express.static(publicPath));

/**
 * Error handler
 */
app.use(errorHandler);

/**
 * Manifest
 */

app.use(
    manifestHelper({
        manifestPath: `${publicPath}/asset-manifest.json`,
        cache: !IS_DEV,
    }),
);

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
    module.hot.accept('../pages/routes');
}

export default app;
