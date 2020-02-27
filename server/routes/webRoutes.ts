import express from 'express';
import * as fs from 'fs';
import glob from 'glob';
import path from 'path';

import { config as projectConfig } from '../../tools/utilities/get-config';
export interface RoutesConfig {
    routeExtension: string;
    rootFolder: string;
    app: any;
    port: number;
}

function fileExists(filePath: string, config: RoutesConfig) {
    return fs.existsSync(path.join(config.rootFolder, filePath));
}

async function getRouteObject(config: RoutesConfig) {
    console.log(`/**/*.${config.routeExtension}`);

    const routes = glob
        .sync(config.rootFolder + `/**/*${config.routeExtension}`)
        .map(file => file.replace(config.rootFolder, '').replace(config.routeExtension, ''))
        .filter(route => !route.startsWith('/_'))
        .map(route => route.replace('[', ':').replace(']', ''));

    console.log(routes);

    return routes;
}

export async function getTemplate(
    req: express.Request,
    res: express.Response,
    config: RoutesConfig,
) {
    const url = req.originalUrl;

    // Get template url and remove first /

    let templatePath = (url + config.routeExtension).substr(1);
    let hasTemplate = fileExists(templatePath, config);

    if (!hasTemplate) {
        templatePath = path.join(url, `index${config.routeExtension}`).substr(1);
        hasTemplate = fileExists(templatePath, config);
    }

    // Check if the template is there otherwise return null
    if (!hasTemplate) {
        return {
            templateUrl: '',
            data: projectConfig.nunjucks,
        };
    }

    const initiatorPath = (url + '.ts').substr(1);
    const hasInitiatorPath = fileExists(initiatorPath, config);
    const data = hasInitiatorPath
        ? require(path.join(config.rootFolder, initiatorPath)).default(req, res)
        : {};

    return {
        templateUrl: templatePath,
        data: Object.assign({}, projectConfig.nunjucks, data),
    };
}

export const webRoutes = (config: RoutesConfig) => {
    // const routes = getRouteObject(config);

    // console.log(routes);

    config.app.get('*', async (req: express.Request, res: express.Response) => {
        const { templateUrl, data } = await getTemplate(req, res, config);

        if (templateUrl) {
            console.log(data);
            res.render(templateUrl, data);
        } else {
            res.status(404).render(`404${config.routeExtension}`, data);
        }
    });
};
