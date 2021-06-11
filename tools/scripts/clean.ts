import del from 'del';
import projectConfig from '../config/config';

async function clean() {
    del.sync(projectConfig.dist);
}

export default clean;
