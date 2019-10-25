import * as fs from 'fs';
import path from 'path';

const staticViewsPath = path.join(__dirname, '../../pages/static');

function getRoutes(files: string[]) {
    return files.map((file: string) => {
        return file.substr(0, file.indexOf('.'));
    });
}

function getDirectories(path: string, callback: any) {
    fs.readdir(path, function(err: any, content: any) {
        if (err) return callback(err);
        callback(null, getRoutes(content));
    });
}

const webRoutes = (app: any) => {
    getDirectories(staticViewsPath, function(err: any, routes: any) {
        if (err) {
            console.error(err);
        }

        routes.forEach((route: string) => {
            app.get(`/${route}`, (_: any, res: any) => {
                res.render(`${staticViewsPath}/${route}.html`, { project: { debug: true } });
            });
        });
    });
};

export default webRoutes;
