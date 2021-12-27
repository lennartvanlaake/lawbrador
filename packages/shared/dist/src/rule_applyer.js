"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRuleSet = exports.selectRuleSet = exports.applyConfig = void 0;
const matcher_1 = require("./matcher");
function applyConfig(root, config) {
    const ruleSet = selectRuleSet(root, config);
    return applyRuleSet(root, ruleSet);
}
exports.applyConfig = applyConfig;
function selectRuleSet(root, config) {
    let applicableRuleset;
    for (let i = 0; i < config.documentRuleSets.length; i++) {
        const ruleSet = config.documentRuleSets[i];
        const matches = 
        //@ts-ignore
        ruleSet.conditionRules.every((rs) => (0, matcher_1.getFirstMatching)(root, rs)) && new Boolean((0, matcher_1.getFirstMatching)(root, ruleSet.bodyRule));
        if (matches) {
            applicableRuleset = ruleSet;
            break;
        }
    }
    return applicableRuleset;
}
exports.selectRuleSet = selectRuleSet;
function applyRuleSet(root, rules) {
    if (!rules) {
        return restructure(root);
    }
    let result = root;
    if (rules.bodyRule) {
        result = (0, matcher_1.getFirstMatching)(root, rules.bodyRule);
    }
    return restructure(result);
}
exports.applyRuleSet = applyRuleSet;
function restructure(root) {
    return root.children.map((c) => restructureRecursive(c));
}
function restructureRecursive(node) {
    if (!node.children || node.children.length == 0) {
        return {
            name: 'p',
            children: node.data.map((c) => restructureNodeData(c)),
        };
    }
    else if (node.children.length == 1) {
        return restructureRecursive(node.children[0]);
    }
    else {
        return {
            name: 'div',
            children: node.children.map((c) => restructureRecursive(c)),
        };
    }
}
function restructureNodeData(data) {
    if (data.href) {
        return {
            name: 'a',
            href: data.href,
            text: data.text,
        };
    }
    else {
        return {
            text: data.text,
        };
    }
}
//# sourceMappingURL=rule_applyer.js.map