"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMatching = exports.getFirstMatching = exports.matches = void 0;
function matches(node, rule) {
    if (!node)
        return false;
    let toMatch = [];
    node.chain.forEach((parent) => {
        switch (rule.location) {
            case 'id':
                if (parent.id) {
                    toMatch.push(parent.id);
                }
                break;
            case 'tag':
                if (parent.name) {
                    toMatch.push(parent.name);
                }
                break;
            case 'class':
                if (parent.class) {
                    toMatch.push(parent.class);
                }
                break;
        }
    });
    if (toMatch.length == 0)
        return false;
    switch (rule.op) {
        case 'is':
            return toMatch.includes(rule.value);
        case 'includes':
            return toMatch.some((el) => el.includes(rule.value));
    }
}
exports.matches = matches;
function getFirstMatching(node, rule) {
    if (!rule || matches(node, rule)) {
        return node;
    }
    if (!node || !node.children) {
        return null;
    }
    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const result = getFirstMatching(child, rule);
        if (result) {
            return result;
        }
    }
}
exports.getFirstMatching = getFirstMatching;
function getAllMatching(node, rule) {
    let result = [];
    if (matches(node, rule)) {
        result.push(node);
    }
    if (node.children) {
        const matchedChildren = node.children.flatMap((c) => getAllMatching(c, rule));
        result = result.concat(matchedChildren);
    }
    return result;
}
exports.getAllMatching = getAllMatching;
//# sourceMappingURL=matcher.js.map