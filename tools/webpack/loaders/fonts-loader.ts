import projectConfig from '../../config/config';
import { removeDoubleSlash } from '../../utilities/normalize-path';

const fontsLoader = (isClient = true) => {
    const defaultOptions = {
        name: '[name].[ext]',
        publicPath: removeDoubleSlash(
            `${projectConfig.publicPath}${projectConfig.fontsOutputPath}`,
        ),
        outputPath: removeDoubleSlash(
            `${projectConfig.publicPath}${projectConfig.fontsOutputPath}`,
        ),
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
