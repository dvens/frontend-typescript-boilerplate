import chalk from 'chalk';
import express from 'express';
import * as fs from 'fs';
import path from 'path';

export interface RoutesConfig {
    routeExtension: string;
    rootFolder: string;
    app: any;
}

export function getDirectories(pathName: string) {
    // Filters out all the directories that are private.
    // Private folders are prefixed with _ (underscore)
    return fs.readdirSync(pathName).filter(name => !name.includes('_'));
}

export function parseDirectories(folderName: string, config: RoutesConfig) {
    const files = getDirectories(folderName);

    files.forEach((file: string) => {
        const fullName = path.join(folderName, file);
        const isDirectory = fs.lstatSync(fullName).isDirectory();

        if (isDirectory) {
            parseDirectories(fullName, config);
        } else if (path.extname(file) === config.routeExtension) {
            // Generate a route when its not a directory but a file.
            generateRoute(fullName, config);
        }
    });

    return;
}

export function generateRoute(pathName: string, config: RoutesConfig) {
    const routePaths = path.dirname(pathName).split(config.routeExtension);

    // Check if there are any routes
    if (routePaths.length === 0) return null;

    const routePath = routePaths[0];
    // Return when the path is the base directory (ex: "src/pages")
    if (isBaseDirectory(routePath, config.rootFolder)) return null;

    console.log(routePath, config.rootFolder);

    // Removes the pages directory of the total route path. And generates routes based upon folder structure.
    // Ex: /src/pages/about/contact (route path) - /src/pages/ (pages directory) => /about/contact
    const url = `${routePath.replace(config.rootFolder, '')}`;

    console.log(
        chalk.bgBlueBright(`Generated route:`),
        `http://localhost:${process.env.PORT || 8500}${url}`,
    );

    return config.app.get(`${url}/`, (_: express.Request, res: express.Response) => {
        res.render(pathName, { project: { debug: true } });
    });
}

export function isBaseDirectory(routePath: string, folderName: string) {
    const pathNames = routePath.split('/');
    return (
        pathNames[pathNames.length - 1].toLowerCase() === path.basename(folderName).toLowerCase()
    );
}

export const webRoutes = (config: RoutesConfig) => {
    parseDirectories(config.rootFolder, config);
};
