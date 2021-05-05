function fileCopyConfig(config) {
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
