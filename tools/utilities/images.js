const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminnMozjpeg = require('imagemin-mozjpeg');
const imageminSvgo = require('imagemin-svgo');

const mozjpegOptions = {
    progressive: true,
    quality: 65,
};

const svgoOptions = {
    plugins: [
        { removeViewBox: false },
        { cleanupIDs: false }, //Set to false for WCAG reasons
        { removeTitle: false }, //Set to false for WCAG reasons
        { removeComments: true },
        { removeUnknownsAndDefaults: false }, //Useful for when adding aria-labels / roles to svg tags.
    ],
};

const options = {
    optimizationLevel: 3,
    progressive: false,
    interlaces: false,
    plugins: [
        imageminJpegtran(),
        imageminPngquant({ quality: ['65-80'] }),
        imageminnMozjpeg(mozjpegOptions),
        imageminSvgo(svgoOptions),
    ],
};

function images(buffer) {
    return imagemin.buffer(buffer, options);
}

module.exports = images;
