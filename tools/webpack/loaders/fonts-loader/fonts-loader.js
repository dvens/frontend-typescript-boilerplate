const { config } = require('../../../utilities/get-config');

const fontsLoader = (userOptions = {}) => {
    const defaultOptions = {
        name: '[name].[ext]',
        outputPath: config.fontsOutputPath,
    };

    return {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
            {
                loader: 'file-loader',
                options: Object.assign({}, defaultOptions, userOptions),
            },
        ],
    };
};

module.exports = fontsLoader;
