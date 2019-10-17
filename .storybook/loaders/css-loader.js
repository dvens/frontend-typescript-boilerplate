const autoprefixer = require('autoprefixer');

const BROWSERS = [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
    'ie >= 11',
    'iOS 8'
];

module.exports = configureCSSLoader = () => {

    return {
        test: [/.css$|.scss$/],
        use: [{
            loader: 'postcss-loader',
            options: {
                sourceMap: false,
                plugins: () => [autoprefixer({
                    overrideBrowserslist: BROWSERS
                })]
            }
        }, {
            loader: 'clean-css-loader',
            options: {
                specialComments: 0, // * for keeping all (default), 1 for keeping first one only, 0 for removing all
                mediaMerging: true, // whether to merge @media blocks (default is true)
                inline: ['all'], // Inline all @imports, also external urls
                rebase: false, // set to false to skip URL rebasing
            }
        }, {
            loader: 'sass-loader',
            options: {
                sassOptions: {
                    includePaths: [`/node_modules/`]
                }
            }
        }],
    };

};
