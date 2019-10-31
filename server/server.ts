/**
 * @module Application
 * @description The entry point, responsible to bootstrap all pages.
 * @version 1.0.0
 */
import bodyParser from 'body-parser';
import chalk from 'chalk';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import nunjucks from 'nunjucks';
import path from 'path';

// Config/Utilities
// import { config } from '../tools/utilities/get-config';
// Middleware
import errorHandler from './middleware/errorHandler';
import hotReloadMiddleware from './middleware/hotReload';

/**
 * Application environment
 *
 * See https://www.npmjs.com/package/dotenv
 */
dotenv.config();

/**
 * Initialize app
 */
const app = express();

/**
 * Logger
 */
app.use(logger('dev'));

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
const appViews = [path.join(__dirname, '../pages')];

nunjucks.configure(appViews, { autoescape: true, express: app, watch: true });
app.set('view engine', 'html');

// TODO: transform to nunjucks plugin
// configure(path.join(__dirname, '../pages'), {
//     autoescape: true,
//     express: app,
//     noCache: true,
//     watch: true
// });

/**
 * Body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(config.clientDist));

/**
 * Error handler
 */
app.use(errorHandler);

if (process.env.NODE_ENV === 'development') {
    hotReloadMiddleware(app);
}

app.use(express.static('static'));

/**
 * Routes
 */
app.use('/index.html', (_, res) => {
    res.render('index.html', { project: { debug: true } });
});

/**
 * Listen and browsersync
 */
app.listen(process.env.PORT || 8500, () => {
    console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(`App is running: http://localhost:${process.env.PORT || 8500}`),
    );
});

// TODO implement
// if (config.env === 'development') {
//     app.listen(config.port - 50, () => {
//       browserSync({
//         files: ['app/views/**/*.*', 'public/**/*.*'],
//         notify: true,
//         open: false,
//         port: config.port,
//         proxy: `localhost:${config.port - 50}`,
//         ui: false,
//       });
//     });
//   } else {
//     app.listen(config.port);
//   }
