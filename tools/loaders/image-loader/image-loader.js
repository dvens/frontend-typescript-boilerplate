const {
    config
} = require('../../utilities/get-config');

const getDefaultMode = require('../../utilities/get-default-mode');
const isDevelopment = getDefaultMode() === 'development';

const imageLoader = (userOptions = {}) => {

    const defaultOptions = {
        name: '[name].[ext]',
        outputPath: config.imagesOutputPath,
    };

    const imageWebpackLoaderOptions = {
        disable: isDevelopment,
        mozjpeg: {
            progressive: true,
            quality: 65
        },
        optipng: {
            enabled: false,
        },
        pngquant: {
            quality: [0.65, 0.90],
            speed: 4
        },
        gifsicle: {
            interlaced: false,
        },
    };

    return {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [{
            loader: 'image-webpack-loader',
            options: imageWebpackLoaderOptions
        }, {
            loader: 'file-loader',
            options: Object.assign({}, defaultOptions, userOptions),
        }]
    };

};

module.exports = imageLoader;
