const {
    createModernLegacyConfig
} = require('./tools');

const path = require('path');

module.exports = createModernLegacyConfig({
    entry: path.resolve(__dirname, 'src') + '/app.ts',
});
