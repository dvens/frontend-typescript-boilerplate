import resolveApp from '../tools/utilities/resolve-app';
import { Config } from '../tools/types/config.types';
import fileCopyConfig from './copy';

// TODO: Check if every config option is being used.
const config: Config = {
    // Root folder
    root: resolveApp(''),

    // Source folder
    source: resolveApp('src'),
    pages: resolveApp('src/pages'),
    components: resolveApp('src/components'),
    nodeModules: resolveApp('node_modules'),
    dotenv: resolveApp('.env'),

    // Entries
    clientEntry: [resolveApp('src/client/index.ts')],
    serverEntry: [resolveApp('src/server/index.ts')],

    // Node.js App
    port: Number(process.env.PORT) || 3000,

    // Public folder
    public: resolveApp('public'),

    // Assets Folder
    assets: resolveApp('public/assets'),
    images: resolveApp('public/assets/images'),
    svg: resolveApp('public/assets/svg'),
    favicons: resolveApp('public/assets/favicons'),

    // Data folder
    data: resolveApp('public/data'),

    // Styles Folder
    styles: resolveApp('src/styles'),

    // Dist Folder
    dist: resolveApp('build'),
    serverDist: '',
    clientDist: '',

    // Config legacy prefix
    legacyPrefix: 'legacy-',

    // Config asset prefix
    assetPrefix: process.env.ASSET_PREFIX ? process.env.ASSET_PREFIX : '',

    // Assets dist folders
    imagesOutputPath: '/assets/images/',
    svgOutputPath: '/assets/svg/',
    fontsOutputPath: '/assets/fonts/',
    jsOutputPath: '/assets/js/',
    cssOutputPath: '/assets/css/',
    publicPath: '',

    // Service worker options
    injectManifest: false,
    swSrc: '',

    // Webpack copy config
    copy: {},
};

// Overwrite config
config.clientDist = config.dist;
config.serverDist = config.dist;
config.publicPath = config.assetPrefix || '/';
config.swSrc = `${config.root}/sw-precache.js`;
config.copy = fileCopyConfig(config);

export default config;
