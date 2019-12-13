import fs from 'fs';
import path from 'path';

// Utilities
import { config } from '../../utilities/get-config';
import getDefaultMode from '../../utilities/get-default-mode';

const svgRootPath =
    getDefaultMode() === 'development'
        ? `${config.svg}/`
        : `${config.clientDist}${config.svgOutputPath}`;

const svgCache: { [key: string]: Function } = {};

interface ISVGExtension {}

/**
 * Gets SVG based upon development or production mode.
 * @param {string} name
 * @returns {string}
 */
function getSvg(name: string) {
    if (!name) return '';

    name = name.replace(/\.svg$/, '');

    let svg: any = '';
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

function SVGExtension(nunjucks: any) {
    this.tags = ['svg'];

    this.parse = function(parser: any, nodes: any) {
        // get the tag token
        var tok = parser.nextToken();

        // parse the args and move after the block end. passing true
        // as the second arg is required if there are no parentheses
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        // See above for notes about CallExtension
        return new nodes.CallExtension(this, 'run', args);
    };

    this.run = function(_: any, name: string) {
        let svgString = svgCache[name];
        if (!svgString) {
            svgString = svgCache[name] = new nunjucks.runtime.SafeString(getSvg(name));
        }

        return svgString;
    };
}

export default (SVGExtension as any) as { new (nunjucks: any): ISVGExtension };
