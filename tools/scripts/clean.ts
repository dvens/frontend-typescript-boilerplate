import del from 'del';

import globalConfig from '../utilities/get-config';

const { config } = globalConfig;

async function clean() {
    del.sync(config.dist);
}

export default clean;
