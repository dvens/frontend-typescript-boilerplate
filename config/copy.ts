import { Config } from './../tools/types/config.types';
function fileCopyConfig(config: Config) {
    return {
        patterns: [
            {
                from: config.favicons,
                to: 'assets/favicons',
            },
        ],
    };
}

export default fileCopyConfig;
