const path = require('path');

const config = {};

// Root folder
config.root = path.resolve(__dirname, '../');

// Source folder
config.source = path.resolve(config.root, 'src');
config.pages = path.resolve(config.source, 'pages');
config.components = path.resolve(config.source, 'components');

// Entries
config.appEntry = 'app.ts';
config.polyfillEntry = 'polyfill.ts';

// Server folder
config.server = path.resolve(config.root, 'server');

// Static folder
config.static = path.resolve(config.root, 'static');

// Assets Folder
config.assets = path.resolve(config.static, 'assets');

// Styles Folder
config.styles = path.resolve(config.static, 'styles');

// Dist Folder
config.dist = path.resolve(config.root, 'build');

// Config legacy prefix
config.legacyPrefix = 'legacy_';

// Config source map
config.sourceMap = true;

// Transpiled packages
config.transpilePackages = ['@frontend', '@atomify'],

    module.exports = config;
