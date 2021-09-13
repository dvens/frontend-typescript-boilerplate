module.exports = function config(projectConfig) {
    const config = {
        contenthash: true, // Default is false
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
