const chalk = require('chalk');
const fs = require('fs');
const path = require('path');


const {
    config
} = require('../utilities/get-config');
const ensureDirectoryExistence = require('../utilities/ensure-directory-existence');
const configureNunjucks = require('../utilities/configure-nunjucks');

const projectConfig = config;
const env = configureNunjucks([projectConfig.pages, projectConfig.components], {});

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
    const templateData = Object.assign({}, data, projectConfig.nunjucks);
    const baseUrl = templateUrl.replace(`${projectConfig.pages}`, '');
    const templateDistUrl = `${projectConfig.clientDist}${baseUrl}`;

    ensureDirectoryExistence(templateDistUrl);
    fs.writeFileSync(templateDistUrl, env.render(templateUrl, templateData));

    console.log(`[${new Date().toISOString()}]`, chalk.blue(`Generated: ${baseUrl}`));
}

function createStaticRoutes() {
    console.log(`[${new Date().toISOString()}]`, chalk.blue(`Generating static routes...`));
    parseDirectories(config.pages, {
        routeExtension: '.html',
    });
}

createStaticRoutes();
