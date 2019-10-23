import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config';
import { config } from '../../tools/utilities/get-config';

const compiler: any = webpack(webpackConfig);

const hotReloadMiddleware = (app: any) => {
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: config.publicPath,
        }),
    );
    app.use(webpackHotMiddleware(compiler));
};

export default hotReloadMiddleware;
