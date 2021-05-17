module.exports = function config(defaultConfig) {
    const config = {
        copy: {
            patterns: [
                {
                    from: defaultConfig.favicons,
                    to: 'favicons',
                },
            ],
        },
    };
    return config;
};
