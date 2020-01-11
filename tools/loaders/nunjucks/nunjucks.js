const configureNunjucksLoader = () => {
    return [
        {
            test: /\.html$/,
            use: ['raw-loader'],
        },
    ];
};

module.exports = configureNunjucksLoader;
