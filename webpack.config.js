const {
    createModernLegacyConfig
} = require('./tools/webpack');

const path = require('path');

module.exports = createModernLegacyConfig({
    entry: path.resolve(__dirname, 'src') + '/app.ts',
    plugins: ['@babel/plugin-syntax-jsx',
        ['@babel/plugin-transform-react-jsx', {
            'pragma': 'h'
        }]
    ]
});