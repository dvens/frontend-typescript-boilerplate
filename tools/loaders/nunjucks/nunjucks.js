const configureNunjucksLoader = () => {
    return [
        {
            test: /\.njk$/,
            use: 'nunjucks-loader',
        },
    ];
};

module.exports = configureNunjucksLoader;
