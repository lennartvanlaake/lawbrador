"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_applyer_1 = require("./rule_applyer");
const scraper_1 = require("./scraper");
const chai_1 = require("chai");
describe('Restructuring HTML with empty ruleset', () => {
    const ruleSet = {
        id: '1',
        conditionRules: [],
    };
    it('Restructuring two paragraphs', () => {
        const html = `<p>bla</p><p>bla</p>`;
        const parsed = (0, scraper_1.parse)(html);
        const restructured = (0, rule_applyer_1.applyRuleSet)(parsed, ruleSet);
        (0, chai_1.expect)(restructured.length).to.eq(2);
        (0, chai_1.expect)(restructured.every((n) => n.name == 'p')).to.be.true;
        (0, chai_1.expect)(restructured.every((n) => n.children[0].text == 'bla'))
            .to.be.true;
    });
    it('Restructuring paragraphs with link', () => {
        const html = `<p><a href='somewhere'>bla<a></p><p>bla</p>`;
        const parsed = (0, scraper_1.parse)(html);
        const restructured = (0, rule_applyer_1.applyRuleSet)(parsed, ruleSet);
        (0, chai_1.expect)(restructured.every((n) => n.children[0].text == 'bla'))
            .to.be.true;
        (0, chai_1.expect)(restructured[0].children[0].name).to.eq('a');
        (0, chai_1.expect)(restructured[0].children[0].href).to.eq('somewhere');
    });
    it('Restructuring two divs with two paragraphs each', () => {
        const html = `
			<div><p>bla</p><p>bla</p></div>
			<div><p>bla</p><p>bla</p></div>
		`;
        const parsed = (0, scraper_1.parse)(html);
        const restructured = (0, rule_applyer_1.applyRuleSet)(parsed, ruleSet);
        (0, chai_1.expect)(restructured[0].name).to.eq('div');
        (0, chai_1.expect)(restructured[0].children[0].name).to.eq('p');
        (0, chai_1.expect)(restructured[0].children[0].children[0].text).to.eq('bla');
    });
});
describe('Restructuring HTML with body rule', () => {
    const ruleSet = {
        id: '1',
        conditionRules: [],
        bodyRule: {
            op: 'is',
            location: 'id',
            value: 'root',
        },
    };
    it('Two paragraphs in root element', () => {
        const html = `
		<div id='root'><p>bla</p><p>bla</p></div>
		<div><p>irrelevant bla</p></div>
		`;
        const parsed = (0, scraper_1.parse)(html);
        const restructured = (0, rule_applyer_1.applyRuleSet)(parsed, ruleSet);
        (0, chai_1.expect)(restructured.length).to.eq(2);
        (0, chai_1.expect)(restructured.every((n) => n.name == 'p')).to.be.true;
        (0, chai_1.expect)(restructured.every((n) => n.children[0].text == 'bla'))
            .to.be.true;
    });
});
const sourceConfig = {
    id: '1',
    name: 'test',
    searchUrlConfig: {
        base: 'http://x.nl',
        pathComponents: [],
        queryComponents: {},
    },
    documentUrlConfig: {
        base: 'http://x.nl',
        pathComponents: [],
        queryComponents: {},
    },
    documentRuleSets: [
        {
            id: '1',
            conditionRules: [
                {
                    op: 'is',
                    location: 'class',
                    value: 'specific',
                },
            ],
            bodyRule: {
                op: 'is',
                location: 'id',
                value: 'important',
            },
        },
        {
            id: '2',
            conditionRules: [],
            bodyRule: {
                op: 'is',
                location: 'id',
                value: 'important',
            },
        },
        {
            id: '3',
            conditionRules: [],
        },
    ],
    // irrelevant to this test
    htmlSearchRuleSet: {
        pageVariable: '',
        queryVariable: '',
        resultListRule: {
            op: 'is',
            location: 'class',
            value: '',
        },
        resultRule: {
            op: 'is',
            location: 'class',
            value: '',
        },
        resultLinkRule: {
            op: 'is',
            location: 'tag',
            value: '',
        },
    },
};
describe('Selecting documentRuleSets', () => {
    it('selects the ruleset if both body and specific rule match', () => {
        const html = `<div id='important'><p class='specific'>bla</p></div>`;
        const parsed = (0, scraper_1.parse)(html);
        const ruleSet = (0, rule_applyer_1.selectRuleSet)(parsed, sourceConfig);
        (0, chai_1.expect)(ruleSet.id).to.eq('1');
    });
    it('selects the ruleset if only body matches', () => {
        const html = `<div id='important'><p>bla</p></div>`;
        const parsed = (0, scraper_1.parse)(html);
        const ruleSet = (0, rule_applyer_1.selectRuleSet)(parsed, sourceConfig);
        (0, chai_1.expect)(ruleSet.id).to.eq('2');
    });
    it('selects the default empty ruleset', () => {
        const html = `<div><p>bla</p></div>`;
        const parsed = (0, scraper_1.parse)(html);
        const ruleSet = (0, rule_applyer_1.selectRuleSet)(parsed, sourceConfig);
        (0, chai_1.expect)(ruleSet.id).to.eq('3');
    });
});
//# sourceMappingURL=rule_applyer.spec.js.map