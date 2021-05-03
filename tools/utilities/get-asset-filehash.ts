import fs from 'fs';

import getDefaultMode from './get-default-mode';
const IS_PRODUCTION = getDefaultMode() === 'production';

function getAssetFilehash(filePath, key, prefix = '') {
    if (!IS_PRODUCTION) return key;

    const fallbackKey = `${prefix}${key}`;
    if (fs.existsSync(filePath)) {
        const statsFile = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(statsFile);

        let hash = fallbackKey;

        if (data[key]) {
            hash = data[key];
        } else {
            console.error(`The ${key} is not available in the json file`);
        }

        return hash;
    }

    return fallbackKey;
}

export default getAssetFilehash;
