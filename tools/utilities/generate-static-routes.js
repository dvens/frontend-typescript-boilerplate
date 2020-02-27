const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const { config } = require('./get-config');
const ensureDirectoryExistence = require('./ensure-directory-existence');
const configureNunjucks = require('./configure-nunjucks');
const { nunjucksConfig } = require('../nunjucks/nunjucks-config');

const projectConfig = config;
const env = configureNunjucks([projectConfig.pages, projectConfig.components], nunjucksConfig);

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
async function parseDirectories(folderName, config) {
    const files = getDirectories(folderName);

    await files.forEach(async file => {
        const fullName = path.join(folderName, file);
        const isDirectory = fs.lstatSync(fullName).isDirectory();

        if (isDirectory) {
            await parseDirectories(fullName, config);
        } else if (path.extname(file) === config.routeExtension) {
            // Generate a static template when its not a directory but a file.
            await generateStaticFile(fullName, config);
        }
    });
}

async function generateStaticFile(pathName, config) {
    const templateUrl = pathName;
    const JSONUrl = path.join(pathName.replace(config.routeExtension, '.json'));
    const hasJSONfile = fs.existsSync(JSONUrl);

    let data = {};

    // Check if the page has a corresponding JSON file.
    if (hasJSONfile) {
        const JSONfile = fs.readFileSync(JSONUrl);
        data = JSON.parse(`${JSONfile}`);
    }

    const templateData = Object.assign({}, data, projectConfig.nunjucks);
    const baseUrl = templateUrl.replace(`${projectConfig.pages}`, '');
    const templateDistUrl = `${projectConfig.clientDist}${
        projectConfig.htmlOutputPath
    }${baseUrl.replace(config.routeExtension, '.html')}`;

    const template = await env.render(templateUrl, templateData);

    ensureDirectoryExistence(templateDistUrl);
    await fs.writeFileSync(templateDistUrl, template);

    console.log(`[${new Date().toISOString()}]`, chalk.blue(`Generated: ${baseUrl}`));
}

async function generateStaticRoutes() {
    console.log(`[${new Date().toISOString()}]`, chalk.blue(`Generating static routes...`));
    await parseDirectories(config.pages, {
        routeExtension: '.njk',
    });
}

module.exports = generateStaticRoutes;
