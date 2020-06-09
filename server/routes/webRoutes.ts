import express from 'express';
import { match, pathToRegexp } from 'path-to-regexp';

import { config as projectConfig } from '../../tools/utilities/get-config';
import getDefaultMode from '../../tools/utilities/get-default-mode';
import getRouteObject from '../../tools/utilities/get-route-object';
export interface RoutesConfig {
    rootFolder: string;
    app: any;
    port: number;
    routeExtension: string;
}

type RouteObjects = ReturnType<typeof getRouteObject>;

const IS_PRODUCTION_MODE = getDefaultMode() === 'production';

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
    const routes = getRouteObject(config.rootFolder);

    config.app.get('*', async (req: express.Request, res: express.Response) => {
        const { templateUrl, data } = await getTemplate(
            req,
            res,
            // Update the route object only when development mode is on.
            IS_PRODUCTION_MODE ? routes : getRouteObject(config.rootFolder),
        );

        if (templateUrl) {
            res.render(templateUrl, data);
        } else {
            res.status(404).render(`404.njk`, data);
        }
    });
};
