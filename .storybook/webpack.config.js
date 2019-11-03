const configureBabelLoader = require('../tools/loaders/javascript-typescript');
const configureCSSLoader = require('../tools/loaders/style-sass');
const eslintConfig = require('../tools/loaders/eslint');
const SassLintPlugin = require('sass-lint-webpack');
const path = require('path');

const {
    alias
} = require('../tools/utilities/get-config');

module.exports = ({
    config
}) => {

    // Javascript/Typescript loader
    config.module.rules.push(...configureBabelLoader({
        includedPackages: [/node_modules\/(?!@atomify)/],
        legacy: true
    }));

    // Eslint config
    config.module.rules.push(eslintConfig);

    // CSS/SASS loader
    config.module.rules.push(...configureCSSLoader());
    config.plugins.push(new SassLintPlugin());

    // Valid extensions
    config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx', '.md');

    // Alias configuration
    config.resolve.alias = alias;

    return config;
};
