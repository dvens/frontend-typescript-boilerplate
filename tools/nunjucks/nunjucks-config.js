const SVGExtension = require('./extensions/svg');

const nunjucksConfig = {
    extensions: [
        {
            name: 'SVGExtension',
            func: nunjucks => new SVGExtension(nunjucks),
        },
    ],
};

module.exports = { nunjucksConfig };
