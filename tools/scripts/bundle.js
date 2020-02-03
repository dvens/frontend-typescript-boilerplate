const webpack = require('webpack');
const { config } = require('../utilities/get-config');
const webpackConfig = require(`${config.root}/webpack.config`);

/**
 * Creates application bundles from the source files.
 */
function bundle() {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig).run(err => {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
}

module.exports = bundle;
