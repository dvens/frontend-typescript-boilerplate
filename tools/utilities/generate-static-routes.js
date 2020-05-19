const { pathToRegexp, match } = require('path-to-regexp');

const dynamicRouteExports = require('../../config/dynamic-route-exports');

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
    const dynamicRoutes = routes.filter(route => route.isDynamic);
    const staticRoutes = routes.filter(route => !route.isDynamic);

    const dynamicExports = await dynamicRouteExports();

    const dynamicPages = dynamicExports.map(url => {
        const route = dynamicRoutes.find(route => {
            const regexp = pathToRegexp(route.url);
            const match = regexp.exec(url);
            return match;
        });

        const matcher = match(route.url, { decode: decodeURIComponent });
        const paramObject = matcher(url);

        return {
            ...route,
            url,
            params: paramObject && paramObject.params,
        };
    });

    const pages = [...dynamicPages, ...staticRoutes];

    for (const page of pages) {
        const { templatePath, initiator, url, isIndex } = page;

        const templateUrl = url + (isIndex ? 'index' : '');

        const templateDistUrl =
            projectConfig.clientDist + projectConfig.htmlOutputPath + templateUrl + `.html`;

        ensureDirectoryExistence(templateDistUrl);

        const data = initiator
            ? await initiator({
                  params: page.params || {},
              })
            : {};

        const templateData = Object.assign({}, data, projectConfig.nunjucks);

        const template = env.render(templatePath, templateData);

        fs.writeFileSync(templateDistUrl, template);
        console.log(`[${new Date().toISOString()}]`, chalk.blue(`Generated: ${templateUrl}`));
    }
}

async function generateStaticRoutes() {
    console.log(`[${new Date().toISOString()}]`, chalk.blue(`Generating static routes...`));
    const routes = getRouteObject(config.pages);
    await generatePages(routes);
}

module.exports = generateStaticRoutes;
