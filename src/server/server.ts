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
import config from '../../config/config';
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
const SERVER_PORT = config.port;
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
app.use(config.publicPath, express.static(path.join(config.clientDist, config.publicPath)));

/**
 * Error handler
 */
app.use(errorHandler);

/**
 * Manifest
 */
const manifestPath = path.join(config.clientDist, config.publicPath);
app.use(
    manifestHelper({
        manifestPath: `${manifestPath}/asset-manifest.json`,
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
