const fs = require('fs');
const path = require('path');

// Utilities
const getDefaultMode = require('../../utilities/get-default-mode');
const { config } = require('../../utilities/get-config');

const svgRootPath =
    getDefaultMode() === 'development'
        ? `${config.svg}/`
        : `${config.clientDist}${config.svgOutputPath}`;

const svgCache = {};

/**
 * Gets SVG based upon development or production mode.
 * @param {string} name
 * @returns {string}
 */
function getSvg(name) {
    if (!name) return '';

    name = name.replace(/\.svg$/, '');

    let svg = '';
    const svgPath = path.resolve(svgRootPath, `${name}.svg`);

    try {
        svg = fs.readFileSync(svgPath);
    } catch (error) {
        console.error({
            sender: 'SVG',
            message: `Failed to retrieve the svg: ${svgPath}`,
        });
    }

    svg = svg.toString();
    svg = '\n<!--  ' + name + '.svg  -->\n' + svg + '\n';

    return svg;
}

/**
 * Inline SVG extension for Nunjucks
 * @param {*} nunjucks
 */
function SVGExtension(nunjucks) {
    this.tags = ['svg'];

    this.parse = function(parser, nodes) {
        // get the tag token
        var tok = parser.nextToken();

        // parse the args and move after the block end. passing true
        // as the second arg is required if there are no parentheses
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        // See above for notes about CallExtension
        return new nodes.CallExtension(this, 'run', args);
    };

    this.run = function(_, name) {
        let svgString = svgCache[name];
        if (!svgString) {
            svgString = svgCache[name] = new nunjucks.runtime.SafeString(getSvg(name));
        }

        return svgString;
    };
}

module.exports = SVGExtension;
