// import chalk from 'chalk';
const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');
const {
    config
} = require('../utilities/get-config');
const projectConfig = config;
const ensureDirectoryExistence = require('../utilities/ensure-directory-existence');

/**
 * Gets directories based on pathname and excludes private folders by using _
 * @param {string} pathName
 * @returns {array} of directories.
 */
function getDirectories(pathName) {
    // Filters out all the directories that are private.
    // Private folders are prefixed with _ (underscore)
    return fs.readdirSync(pathName).filter(name => !name.includes('_'));
}


/**
 * Checks recursively if there are files that can be staticly rendered.
 * @param {string} folderName
 * @param {object} config
 * @returns
 */
function parseDirectories(folderName, config) {
    const files = getDirectories(folderName);

    files.forEach(file => {
        const fullName = path.join(folderName, file);
        const isDirectory = fs.lstatSync(fullName).isDirectory();

        if (isDirectory) {
            parseDirectories(fullName, config);
        } else if (path.extname(file) === config.routeExtension) {
            // Generate a static template when its not a directory but a file.
            generateStaticFile(fullName, config);
        }
    });
}

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

function generateStaticFile(pathName, config) {
    const templateUrl = pathName;
    const JSONUrl = path.join(pathName.replace(config.routeExtension, '.json'));
    const hasJSONfile = fs.existsSync(JSONUrl);

    let data = {};

    // Check if the page has a corresponding JSON file.
    if (hasJSONfile) {
        const JSONfile = fs.readFileSync(JSONUrl);
        data = JSON.parse(`${JSONfile}`);
    }

    // TODO: also add beautify and minify.
    // TODO: add file creating logging
    const env = configureNunjucks([projectConfig.pages, projectConfig.components], {});

    const templateDate = Object.assign({}, data, projectConfig.nunjucks);
    const baseUrl = templateUrl.replace(`${projectConfig.pages}`, '');
    const templateDistUrl = `${projectConfig.clientDist}${baseUrl}`;

    ensureDirectoryExistence(templateDistUrl);
    fs.writeFileSync(templateDistUrl, env.render(templateUrl, templateDate));
}

parseDirectories(config.pages, {
    routeExtension: '.html',
});
