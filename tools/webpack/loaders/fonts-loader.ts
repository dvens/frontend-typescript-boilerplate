import projectConfig from '../../config/config';

const fontsLoader = (isClient = true) => {
    const defaultOptions = {
        name: '[name].[ext]',
        outputPath: projectConfig.fontsOutputPath,
        emitFile: !isClient,
    };

    return {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
            {
                loader: 'file-loader',
                options: defaultOptions,
            },
        ],
    };
};

export default fontsLoader;
