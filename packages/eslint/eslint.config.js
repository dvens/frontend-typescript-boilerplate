module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['simple-import-sort'],
    env: {
        browser: true,
        mocha: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        semi: 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        'prettier/prettier': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'import/no-unresolved': 'off',
        'simple-import-sort/sort': 'warn',
        'import/named': 'off',
        'import/namespace': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
