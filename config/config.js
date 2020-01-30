const resolveApp = require('../tools/utilities/resolve-app');
const getDefaultMode = require('../tools/utilities/get-default-mode');
const fileCopyConfig = require('./copy');

const config = {};

// Root folder
config.root = resolveApp('');

// Source folder
config.source = resolveApp('src');
config.pages = resolveApp('src/pages');
config.components = resolveApp('src/components');
config.nodeModules = resolveApp('node_modules');
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
config.images = resolveApp('static/assets/images');
config.svg = resolveApp('static/assets/svg');

// Data folder
config.data = resolveApp('static/data');

// Styles Folder
config.styles = resolveApp('src/styles');

// Dist Folder
config.dist = resolveApp('build');
config.clientDist = config.dist;

// Config legacy prefix
config.legacyPrefix = 'legacy_';

// Config asset prefix
config.assetPrefix = process.env.ASSET_PREFIX ? process.env.ASSET_PREFIX : '';

// Assets dist folders
config.imagesOutputPath = '/assets/images/';
config.svgOutputPath = '/assets/svg/';
config.fontsOutputPath = '/assets/fonts/';
config.jsOutputPath = 'assets/js/';
config.publicPath = config.assetPrefix;

// Config CSS in JS option
config.cssInJS = true;

// Browsersync watched files
config.browserSync = ['src/**/*.njk', 'src/**/*.tsx'];

// Nunjucks config
config.nunjucks = {
    project: {
        debug: getDefaultMode() === 'development',
        assetPrefix: config.assetPrefix,
        ...require(`${config.data}/project.json`),
    },
};

// Webpack copy config
config.copy = fileCopyConfig(config);

module.exports = config;
