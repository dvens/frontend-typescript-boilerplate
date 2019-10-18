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

// Assets dist folders
config.imagesOutputPath = '/assets/images/';
config.fontsOutputPath = '/assets/fonts/';
config.jsOutputPath = 'assets/js/'

// Config legacy prefix
config.legacyPrefix = 'legacy_';

// Config CSS in JS option
config.cssInJS = true;

// Copy config
config.copy = [{
    from: `${config.static}/data`,
    to: `assets/data`
}]

module.exports = config;
