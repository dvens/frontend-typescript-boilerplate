const resolveApp = require('../tools/utilities/resolve-app');

const getDefaultMode = require('../tools/utilities/get-default-mode');

const config = {};

// Root folder
config.root = resolveApp('');

// Source folder
config.source = resolveApp('src');
config.pages = resolveApp('src/pages');
config.components = resolveApp('src/components');
config.dotenv = resolveApp('.env');

// Entries
config.appEntry = 'index.ts';
config.polyfillEntry = 'polyfill.ts';
config.serverEntry = 'server.ts';

// Server folder
config.server = resolveApp('server');

// Node.js App
config.port = process.env.PORT || 3000;

// Static folder
config.static = resolveApp('static');

// Assets Folder
config.assets = resolveApp('static/assets');

// Styles Folder
config.styles = resolveApp('src/styles');

// Dist Folder
config.dist = resolveApp('build');
config.clientDist = config.dist;

// Assets dist folders
config.imagesOutputPath = '/assets/images/';
config.fontsOutputPath = '/assets/fonts/';
config.jsOutputPath = 'assets/js/';
config.publicPath = '';

// Config legacy prefix
config.legacyPrefix = 'legacy_';

// Config CSS in JS option
config.cssInJS = true;

// Browsersync watched files
config.browserSync = ['src/**/*.html'];

// Project
config.project = {
    debug: getDefaultMode() === 'development'
};

// Copy config
config.copy = [{
    from: `${config.static}/data`,
    to: `assets/data`,
}, {
    from: `${config.static}/assets/images`,
    to: `assets/images`,
}, {
    from: `${config.static}/assets/svg`,
    to: `assets/svg`,
}];

module.exports = config;
