const path = require('path');

const webpackProdConfig = require('./tools/webpack/webpack.dev.config');
const webpackDevConfig = require('./tools/webpack/webpack.dev.config');

const getDefaultMode = require('./tools/utilities/get-default-mode');
const isProduction = getDefaultMode() === 'production';

const config = {
    entry: path.resolve(__dirname, 'src') + '/app.ts',
    plugins: ['@babel/plugin-syntax-jsx',
        ['@babel/plugin-transform-react-jsx', {
            'pragma': 'h'
        }]
    ]
};

module.exports = isProduction ? webpackProdConfig(config) : webpackDevConfig(config);
