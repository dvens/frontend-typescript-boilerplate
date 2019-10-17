module.exports = {
    extends: [
        './tools/eslint/eslint.config.js',
    ].map(require.resolve),
};
