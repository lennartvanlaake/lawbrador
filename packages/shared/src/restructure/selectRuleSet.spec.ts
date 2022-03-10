import type { SourceSiteConfig } from '..';
import { expect } from 'chai';
import { parse } from '../parse/scraper';
import { selectRuleSet } from './selectRuleSet';

const sourceConfig: SourceSiteConfig = {
	_id: '1',
	name: 'test',
	searchUrlConfig: {
		base: 'http://x.nl',
		pathComponents: [],
		queryComponents: []
	},
	documentUrlConfig: {
		base: 'http://x.nl',
		pathComponents: [],
		queryComponents: []
	},
	documentRuleSets: [
		{
			name: '1',
			conditionRules: [
				{
					op: 'is',
					location: 'class',
					value: 'specific'
				}
			],
			bodyRule: {
				op: 'is',
				location: 'id',
				value: 'important'
			}
		},
		{
			name: '2',
			conditionRules: [],
			bodyRule: {
				op: 'is',
				location: 'id',
				value: 'important'
			}
		},
		{
			name: '3'
		}
	],
	// irrelevant to this test
	htmlSearchRuleSet: {
		pageVariable: '',
		queryVariable: '',
		resultListRule: {
			op: 'is',
			location: 'class',
			value: ''
		},
		resultLinkRule: {
			op: 'is',
			location: 'tag',
			value: ''
		}
	}
};

describe('Selecting documentRuleSets', () => {
	it('selects the ruleset if both body and specific rule match', () => {
		const html = `<div id='important'><p class='specific'>bla</p></div>`;
		const parsed = parse(html);
		const ruleSet = selectRuleSet(parsed, sourceConfig);
		expect(ruleSet.name).to.eq('1');
	});
	it('selects the ruleset if only body matches', () => {
		const html = `<div id='important'><p>bla</p></div>`;
		const parsed = parse(html);
		const ruleSet = selectRuleSet(parsed, sourceConfig);
		expect(ruleSet.name).to.eq('2');
	});
	it('selects the empty ruleset if nothing else matches', () => {
		const html = `<div><p>bla</p></div>`;
		const parsed = parse(html);
		const ruleSet = selectRuleSet(parsed, sourceConfig);
		expect(ruleSet.name).to.eq('3');
	});
	it('throws if no ruleset matches', () => {
		const sourceConfigWithoutEmpty = {
			...sourceConfig,
			documentRuleSets: sourceConfig.documentRuleSets.filter((it) => it.name != '3')
		};
		const html = `<div><p>bla</p></div>`;
		const parsed = parse(html);
		expect(() => selectRuleSet(parsed, sourceConfigWithoutEmpty)).to.throw();
	});
});
