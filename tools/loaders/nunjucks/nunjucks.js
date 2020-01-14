const configureNunjucksLoader = () => {
    return [
        {
            test: /\.njk$/,
            loader: 'nunjucks-loader',
        },
    ];
};

module.exports = configureNunjucksLoader;
