const getDefaultMode = require('./tools/utilities/get-default-mode');

const BROWSERS = [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
    'ie >= 11',
    'iOS 8'
];

const plugins = [
    require('autoprefixer')({
        overrideBrowserslist: BROWSERS
    }),
];

// Add minifier when production
if (getDefaultMode() === 'production') {
    plugins.push(require('css-mqpacker'))
    plugins.push(require('cssnano')({
        preset: [
            'default', {
                discardComments: {
                    removeAll: true
                }
            }
        ]
    }));
}

module.exports = {
    plugins
};
