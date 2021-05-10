import webpack from 'webpack';
import getConfig from '../../webpack.config';

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

/**
 * Creates application bundles from the source files.
 */
function bundle() {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig).run((err, stats) => {
            if (err) {
                return reject(err);
            }

            if (stats.hasErrors()) {
                return reject(new Error('Webpack compilation errors'));
            }

            return resolve(true);
        });
    });
}

export default bundle;
