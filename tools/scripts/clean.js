const { config } = require('../utilities/get-config');
const del = require('del');

async function clean() {
    del.sync(config.dist);
}

module.exports = clean;
