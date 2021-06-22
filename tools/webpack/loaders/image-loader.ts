import path from 'path';

import getDefaultMode from '../../utilities/get-default-mode';
const isDevelopment = getDefaultMode() === 'development';

import projectConfig from '../../config/config';
import { removeDoubleSlash } from '../../utilities/normalize-path';

const imageLoader = (isClient = true) => {
    const defaultOptions = {
        name: '[name].[ext]',
        publicPath: removeDoubleSlash(
            `${projectConfig.publicPath}${projectConfig.imagesOutputPath}`,
        ),
        outputPath: removeDoubleSlash(
            `${projectConfig.publicPath}${projectConfig.imagesOutputPath}`,
        ),
        emitFile: !isClient,
    };

    const imageWebpackLoaderOptions = {
        disable: isDevelopment,
        mozjpeg: {
            progressive: true,
            quality: 65,
        },
        optipng: {
            enabled: false,
        },
        pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
        },
        gifsicle: {
            interlaced: false,
        },
    };

    return {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
            {
                loader: 'file-loader',
                options: defaultOptions,
            },
            {
                loader: 'image-webpack-loader',
                options: imageWebpackLoaderOptions,
            },
        ],
    };
};

export default imageLoader;
