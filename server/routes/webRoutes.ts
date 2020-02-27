import express from 'express';
import glob from 'glob';
import path from 'path';
import { match, pathToRegexp } from 'path-to-regexp';

import { config as projectConfig } from '../../tools/utilities/get-config';
export interface RoutesConfig {
    rootFolder: string;
    app: any;
    port: number;
    routeExtension: string;
}

type RouteObjects = ReturnType<typeof getRouteObject>;

function getRouteObject(config: RoutesConfig) {
    const files = glob
        .sync(config.rootFolder + `/**/*.{njk,tsx,html,ts}`)
        .map(file => file.replace(config.rootFolder, ''))
        .filter(route => !route.startsWith('/_'))
        .reverse(); // because dynamic routes should be last

    const fileTypes = files.reduce(
        (acc, file) => {
            const extension = file.split('.').pop();
            if (extension === 'ts') {
                acc.initiators.push(file);
            } else {
                acc.templates.push(file);
            }

            return acc;
        },
        {
            initiators: [] as string[],
            templates: [] as string[],
        },
    );

    return fileTypes.templates.map(templatePath => {
        const extension = templatePath.split('.').pop();
        const route = templatePath.replace(`.${extension}`, '');
        const initiatorPath = fileTypes.initiators.find(init => init === `${route}.ts`);

        return {
            type: extension,
            templatePath: path.join(config.rootFolder, templatePath),
            url: route
                .replace(/\[/g, ':')
                .replace(/\]/g, '')
                .replace('index', ''),
            initiator:
                initiatorPath && require(path.join(config.rootFolder, initiatorPath)).default,
        };
    });
}

export async function getTemplate(
    req: express.Request,
    res: express.Response,
    routes: RouteObjects,
) {
    const url = req.originalUrl;

    const route = routes.find(route => {
        const regexp = pathToRegexp(route.url);
        const match = regexp.exec(url);
        return match;
    });

    if (!route) {
        return { templateUrl: '', data: projectConfig.nunjucks };
    }

    const matcher = match(route.url, { decode: decodeURIComponent });
    const paramObject = matcher(url);

    if (paramObject) {
        req.params = {
            ...paramObject.params,
        };
    }

    const data = route.initiator ? await route.initiator(req, res) : {};

    return {
        templateUrl: route.templatePath,
        data: Object.assign({}, projectConfig.nunjucks, data),
    };
}

export const webRoutes = (config: RoutesConfig) => {
    const routes = getRouteObject(config);

    config.app.get('*', async (req: express.Request, res: express.Response) => {
        const { templateUrl, data } = await getTemplate(req, res, routes);

        if (templateUrl) {
            res.render(templateUrl, data);
        } else {
            res.status(404).render(`404.njk`, data);
        }
    });
};
