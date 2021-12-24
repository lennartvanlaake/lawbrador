import cheerio from 'cheerio';
import axios from 'axios';
function extractDataRecursive(node, $, output) {
    var _a;
    // get the full text of a link, ignoring further sub-elements
    if ((_a = node.attribs) === null || _a === void 0 ? void 0 : _a.href) {
        output.data.push({
            href: node.attribs.href,
            text: $(node).text(),
        });
        return;
    }
    else if (node.data) {
        output.data.push({
            text: node.data,
        });
    }
    if (node.children) {
        node.children.forEach((c) => extractDataRecursive(c, $, output));
    }
}
function getTextNodes(node, $) {
    var _a, _b, _c, _d, _e, _f;
    let output = {
        meta: {},
        chain: [
            {
                name: node.name,
                id: (_a = node.attribs) === null || _a === void 0 ? void 0 : _a.id,
                class: (_b = node.attribs) === null || _b === void 0 ? void 0 : _b.class,
            },
        ],
        data: [],
        children: null,
    };
    // empty text nodes do not count
    node.children = (_c = node.children) === null || _c === void 0 ? void 0 : _c.filter((c) => !(c.type == 'text' && c.data.trim() == ''));
    if (!node.children) {
        return null;
    }
    if (node.children.some((child) => (child === null || child === void 0 ? void 0 : child.type) == 'text')) {
        extractDataRecursive(node, $, output);
        return output;
    }
    // flatten organisation nodes with only other organisation node as child
    if (node.children.length == 1) {
        let childOutput = getTextNodes(node.children[0], $);
        if (!childOutput) {
            return null;
        }
        childOutput.chain.push({
            name: node.name,
            id: (_d = node.attribs) === null || _d === void 0 ? void 0 : _d.id,
            class: (_e = node.attribs) === null || _e === void 0 ? void 0 : _e.class,
        });
        return childOutput;
    }
    // output has multiple children
    output.children = node.children
        .map((child) => getTextNodes(child, $))
        .filter((child) => child != null &&
        (child.data.length != 0 || child.children));
    // organisation with no children that have text should be ignored
    if (((_f = output.children) === null || _f === void 0 ? void 0 : _f.length) == 0)
        return null;
    return output;
}
export function parse(html) {
    const $ = cheerio.load(html);
    return getTextNodes($('body')[0], $);
}
export async function scrape(url) {
    const body = await axios.get(url);
    return parse(body.data);
}
//# sourceMappingURL=scraper.js.map