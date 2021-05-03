import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminnMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';

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
        imageminPngquant({ quality: [0.65, 0.8] }),
        imageminnMozjpeg(mozjpegOptions),
        imageminSvgo(svgoOptions),
    ],
};

function images(buffer) {
    return imagemin.buffer(buffer, options);
}

export default images;
