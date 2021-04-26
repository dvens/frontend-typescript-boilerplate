const resolveApp = require('../tools/utilities/resolve-app');
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
config.appEntry = [resolveApp('src/client/index.ts')];

// Server folder
config.server = resolveApp('server');

// Node.js App
config.port = process.env.PORT || 3000;
config.host = process.env.HOST || 'localhost';

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
config.legacyPrefix = 'legacy-';

// Config asset prefix
config.assetPrefix = process.env.ASSET_PREFIX ? process.env.ASSET_PREFIX : '';

// Assets dist folders
config.imagesOutputPath = '/assets/images/';
config.svgOutputPath = '/assets/svg/';
config.fontsOutputPath = '/assets/fonts/';
config.jsOutputPath = '/assets/js/';
config.publicPath = config.assetPrefix || '/';

// Config CSS in JS option
// TODO: Remove when we are using css modules
config.cssInJS = true;

// Service worker options
config.injectManifest = false;
config.swSrc = `${config.root}/sw-precache.js`;

// Webpack copy config
config.copy = fileCopyConfig(config);

module.exports = config;
