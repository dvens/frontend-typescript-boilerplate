const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getDefaultMode = require('../../utilities/get-default-mode');
const {
    config
} = require('../../utilities/get-config');

const isDevelopment = getDefaultMode() === 'development';

const configureCSSLoader = () => {

    return [{
        test: /\.(s*)css$/,
        include: /\main.(s*)css$/,
        use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    sourceMap: isDevelopment
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    sourceMap: isDevelopment,
                    config: {
                        path: `${ config }/postcss.config.js`
                    }
                }
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: isDevelopment
                }
            }
        ]
    }];

};

module.exports = configureCSSLoader;
