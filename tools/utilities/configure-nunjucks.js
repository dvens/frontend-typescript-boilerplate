const nunjucks = require('nunjucks');

/**
 * Setup basic Nunjucks configuration.
 * https://mozilla.github.io/nunjucks/templating.html
 * @param {array<string>} views
 * @param {object} defaultOptions
 * @returns Nunjucks env
 */
function configureNunjucks(views, defaultOptions) {
    const env = nunjucks.configure(views, defaultOptions);

    if (defaultOptions.extensions && defaultOptions.extensions.length > 0) {
        defaultOptions.extensions.forEach(extension => {
            env.addExtension(extension.name, extension.func(nunjucks));
        });
    }

    if (defaultOptions.filters && defaultOptions.filters.length > 0) {
        defaultOptions.filters.forEach(filter => {
            env.addFilter(filter.name, filter.func);
        });
    }

    return env;
}

module.exports = configureNunjucks;
