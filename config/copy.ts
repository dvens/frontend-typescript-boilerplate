// import images from '../tools/utilities/images';

function fileCopyConfig(config) {
    return {
        patterns: [
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
        ],
    };
}

export default fileCopyConfig;
