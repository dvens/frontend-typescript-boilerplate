import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { config } from '../../tools/utilities/get-config';
import webpackConfig from '../../webpack.config';

const compiler: any = webpack(webpackConfig);
const instance = webpackDevMiddleware(compiler, {
    publicPath: config.publicPath,
});

const hotReloadMiddleware = (app: any, callback?: () => void) => {
    app.use(instance);
    app.use(webpackHotMiddleware(compiler));

    instance.waitUntilValid(() => {
        if (callback) callback();
    });
};

export default hotReloadMiddleware;
