import path from 'path';

import getDefaultMode from '../../utilities/get-default-mode';
const isDevelopment = getDefaultMode() === 'development';

import globalConfig from '../../utilities/get-config';

const { config } = globalConfig;

const imageLoader = (isClient = true) => {
    const defaultOptions = {
        name() {
            if (isDevelopment) {
                return '[path][name].[ext]';
            }

            return '[name].[ext]';
        },
        outputPath(_, resourcePath) {
            const relativePath = path.relative(config.public, resourcePath);
            return `/${relativePath}`;
        },
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
