import del from 'del';
import defaultConfig from '../config/config';

async function clean() {
    del.sync(defaultConfig.dist);
}

export default clean;
