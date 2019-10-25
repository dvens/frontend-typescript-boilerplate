import * as fs from 'fs';
import path from 'path';

const staticViewsPath = path.join(__dirname, '../../pages/static');

export function getRoutes(files: string[]) {
    return files.map((file: string) => {
        return file.substr(0, file.indexOf('.'));
    });
}

export function getDirectories(path: string) {
    return fs.readdirSync(path);
}

export const webRoutes = (app: any) => {
    const files = getDirectories(staticViewsPath);
    const routes = getRoutes(files);

    routes.forEach((route: string) => {
        app.get(`/${route}`, (_: any, res: any) => {
            res.render(`${staticViewsPath}/${route}.html`, { project: { debug: true } });
        });
    });
};

export default webRoutes;
