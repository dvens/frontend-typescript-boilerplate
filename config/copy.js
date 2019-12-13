const images = require('../tools/scripts/images');

function fileCopyConfig(config) {
    return [
        {
            from: config.images,
            to: 'assets/images',
            transform: image => {
                return images(image);
            },
        },
        {
            from: config.svg,
            to: 'assets/svg',
            transform: svg => {
                return images(svg);
            },
        },
    ];
}

module.exports = fileCopyConfig;
