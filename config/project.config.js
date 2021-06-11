module.exports = function config(projectConfig) {
    const config = {
        copy: {
            patterns: [
                {
                    from: projectConfig.favicons,
                    to: 'favicons',
                },
            ],
        },
    };
    return config;
};
