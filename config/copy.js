// const images = require('../tools/utilities/images');

function fileCopyConfig(config) {
    return [
        // Optional when you want to copy assets like images or svgs that are being used by Nunjucks.
        // By default the assets used within CSS or Javascript will be moved by Webpack.
        // {
        //     from: config.images,
        //     to: 'assets/images',
        //     transform: image => {
        //         return images(image);
        //     },
        // },
        // {
        //     from: config.svg,
        //     to: 'assets/svg',
        //     transform: svg => {
        //         return images(svg);
        //     },
        // },
        {
            from: config.favicons,
            to: 'assets/favicons',
        },
    ];
}

module.exports = fileCopyConfig;
