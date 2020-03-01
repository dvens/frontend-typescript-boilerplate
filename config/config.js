const resolveApp = require('../tools/utilities/resolve-app');
const getDefaultMode = require('../tools/utilities/get-default-mode');
const fileCopyConfig = require('./copy');
const polyfills = require('./polyfills');

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
config.serverEntry = 'server.ts';
config.distEntries = ['main.js'];

// Server folder
config.server = resolveApp('server');

// Node.js App
config.port = process.env.PORT || 3000;

// Public folder
config.public = resolveApp('public');

// Assets Folder
config.assets = resolveApp('public/assets');
config.images = resolveApp('public/assets/images');
config.svg = resolveApp('public/assets/svg');
config.favicons = resolveApp('public/assets/favicons');

// Data folder
config.data = resolveApp('public/data');

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
config.jsOutputPath = '/assets/js/';
config.faviconsOutputPath = '/assets/favicons/';
config.polyfillOutputPath = '/assets/js/polyfills/';
config.htmlOutputPath = '';
config.publicPath = config.assetPrefix;

// Config CSS in JS option
config.cssInJS = true;

// Browsersync watched files
config.browserSync = ['src/**/*.njk', 'src/**/*.ts'];

// Nunjucks config
config.nunjucks = {
    project: {
        debug: getDefaultMode() === 'development' || getDefaultMode() === 'debug',
        assetPrefix: config.assetPrefix,
        ...require(`${config.data}/project.json`),
    },
};

// Polyfills
config.polyfills = polyfills;

// Service worker options
config.offlineSupport = false;
config.swSrc = `${config.source}/sw-precache.ts`;

console.log(config.swSrc);

// Webpack copy config
config.copy = fileCopyConfig(config);

module.exports = config;
