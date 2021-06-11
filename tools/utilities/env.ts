import fs from 'fs';
import path from 'path';
import projectConfig from '../config/config';

if (!process.env.NODE_ENV) {
    throw new Error(
        'The process.env.NODE_ENV environment variable is required but was not specified.',
    );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
    `${projectConfig.dotenv}.${process.env.NODE_ENV}.local`,
    `${projectConfig.dotenv}.${process.env.NODE_ENV}`,
    process.env.NODE_ENV !== 'test' && `${projectConfig.dotenv}.local`,
    projectConfig.dotenv,
].filter(Boolean);

dotenvFiles.forEach((dotenvFile) => {
    if (fs.existsSync(dotenvFile)) {
        require('dotenv').config({
            path: dotenvFile,
        });
    }
});

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
    .split(path.delimiter)
    .filter((folder) => folder && !path.isAbsolute(folder))
    .map((folder) => path.resolve(appDirectory, folder))
    .join(path.delimiter);

export default () => {
    const raw = {
        PORT: process.env.PORT || 3000,
        NODE_ENV: process.env.NODE_ENV || 'development',
        HOST: process.env.HOST || 'http://localhost',
        ASSET_PREFIX: process.env.ASSET_PREFIX || '',
    };

    // Stringify all values so we can feed into Webpack DefinePlugin
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);
            return env;
        }, {}),
    };

    return {
        raw,
        stringified,
    };
};
