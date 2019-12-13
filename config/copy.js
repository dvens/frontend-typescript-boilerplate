const images = require('../tools/scripts/images');

function fileCopyConfig(config) {
    return [
        {
            from: config.images,
            to: 'assets/images',
            transform: imageBuffer => {
                return images(imageBuffer);
            },
        },
        {
            from: config.svg,
            to: 'assets/svg',
            transform: svgBuffer => {
                return images(svgBuffer);
            },
        },
    ];
}

module.exports = fileCopyConfig;
