/**
 * @module Application
 * @description The entry point, responsible to bootstrap all pages.
 * @version 1.0.0
 */
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';

// Config/Utilities
import { config } from '../../tools/utilities/get-config';
// Middleware
import errorHandler from './middleware/errorHandler';
import hotReload from './middleware/hotReload';
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
const SERVER_HOST = config.host;
const IS_PROD = process.env.NODE_ENV === 'production';
const IS_DEV = process.env.NODE_ENV === 'development';

const app = express();

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
 * Static files during dev and prod mode
 */
const assetsPath = IS_PROD ? `${config.clientDist}/assets` : config.assets;
app.use('/assets', express.static(assetsPath));

/**
 * Error handler
 */
app.use(errorHandler);

/**
 * Development config
 */
if (IS_DEV) {
    // Enable hot reload when in production mode.
    // And wait until webpack is compiled.
    hotReload(app);
}

/**
 * Serverside rendering
 */
app.get('*', ssr);

app.listen(SERVER_PORT, SERVER_HOST);
