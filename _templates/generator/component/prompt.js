module.exports = [
    {
        type: 'select',
        name: 'kind',
        message: 'What kind of component?',
        choices: ['atom', 'molecule', 'organism', 'template'],
    },
    {
        type: 'input',
        name: 'cssType',
        message: 'SASS(s) or CSS(c)',
        default: 'c',
    },
    {
        type: 'input',
        name: 'componentType',
        message: 'Nunjucks(n) or Atomify(a)',
        default: 'n',
    },
    {
        type: 'confirm',
        name: 'withStorybook',
        message: 'Add a storybook story?',
        default: false,
    },
    {
        type: 'confirm',
        name: 'withDocs',
        message: 'Add a doc?',
        default: false,
    },
    {
        type: 'confirm',
        name: 'withTest',
        message: 'Add a test?',
        default: false,
    },
];
