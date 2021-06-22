// const configureBabelLoader = require('../tools/loaders/javascript-typescript');
// const configureCSSLoader = require('../tools/loaders/style-sass');
// const alias = require('../tools/config/alias');

module.exports = ({ config }) => {
    // // Javascript/Typescript loader
    // config.module.rules.push(
    //     ...configureBabelLoader({
    //         includedPackages: [/node_modules\/(?!@atomify)/],
    //         legacy: true,
    //     }),
    // );

    // // CSS/SASS loader
    // config.module.rules.push(...configureCSSLoader({ extract: false }));

    // Valid extensions
    // config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx', '.md');

    // // Alias configuration
    // config.resolve.alias = alias.defaults;

    return config;
};
