const path = require('path');
const fs = require('fs');

async function ensureDirectoryExistence(filePath) {
    const dirname = await path.dirname(filePath);
    if (await fs.existsSync(dirname)) {
        return true;
    }
    await ensureDirectoryExistence(dirname);
    await fs.mkdirSync(dirname);
}

module.exports = ensureDirectoryExistence;
