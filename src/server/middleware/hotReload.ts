import chalk from 'chalk';

import { config } from '../../../tools/utilities/get-config';

export default function hotReload(app: any) {
    const webpack = require('webpack');
    const webpackConfig = require('../../../webpack.config');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const compiler = webpack(webpackConfig);
    const instance = webpackDevMiddleware(compiler, {
        publicPath: config.publicPath,
        stats: 'minimal',
        serverSideRender: true,
        watchOptions: { ignored: /node_modules/ },
    });

    app.use(instance);
    app.use(webpackHotMiddleware(compiler, {}));

    instance.waitUntilValid(() => {
        const url = `http://${config.host}:${config.port}`;
        console.log(`[${new Date().toISOString()}]`, chalk.green(`==> 🌎  Listening at ${url}`));
    });
}
