const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const { config } = require('./get-config');
const ensureDirectoryExistence = require('./ensure-directory-existence');
const configureNunjucks = require('./configure-nunjucks');
const { nunjucksConfig } = require('../nunjucks/nunjucks-config');
const getRouteObject = require('./get-route-object');

const projectConfig = config;
const env = configureNunjucks([projectConfig.pages, projectConfig.components], nunjucksConfig);

async function generatePages(routes) {
    for (const page of routes) {
        const { templatePath, initiator, type: extension, isDynamic } = page;

        const baseUrl = templatePath.replace(`${projectConfig.pages}`, '');

        const templateDistUrl = `${projectConfig.clientDist}${
            projectConfig.htmlOutputPath
        }${baseUrl.replace(`.${extension}`, '.html')}`;

        if (isDynamic) {
            // skip dynamic routes for now
            console.log(
                `[${new Date().toISOString()}]`,
                chalk.blue(`Skip for now: ${baseUrl} (is dynamic)`),
            );
            continue;
        }

        ensureDirectoryExistence(templateDistUrl);

        const data = initiator ? await initiator() : {};
        const templateData = Object.assign({}, data, projectConfig.nunjucks);

        const template = env.render(templatePath, templateData);

        fs.writeFileSync(templateDistUrl, template);
        console.log(`[${new Date().toISOString()}]`, chalk.blue(`Generated: ${baseUrl}`));
    }
}

async function generateStaticRoutes() {
    console.log(`[${new Date().toISOString()}]`, chalk.blue(`Generating static routes...`));
    const routes = getRouteObject(config.pages);
    await generatePages(routes);
}

module.exports = generateStaticRoutes;
