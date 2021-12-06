import {
	applyConfig,
	selectRuleSet,
} from '@legalthingy/parse/src/rule_applyer';
import { parse } from '@legalthingy/parse/src/scraper';
import {
	SelectionLocation,
	SelectionOperator,
	SourceSiteConfig,
} from '@legalthingy/shared/schemas/rules';

const config: SourceSiteConfig = {
	name: 'test',
	baseUrl: 'https://tester.test',
	documentRuleSets: [
		{
			id: '1',
			conditionRules: [
				{
					op: SelectionOperator.Is,
					location: SelectionLocation.Class,
					value: 'specific',
				},
			],
			bodyRule: {
				op: SelectionOperator.Is,
				location: SelectionLocation.Id,
				value: 'important',
			},
		},
		{
			id: '2',
			conditionRules: [],
			bodyRule: {
				op: SelectionOperator.Is,
				location: SelectionLocation.Id,
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
		pathWithVariables: '',
		inputVariables: [],
		resultListRule: {
			op: SelectionOperator.Is,
			location: SelectionLocation.Class,
			value: '',
		},
		resultRule: {
			op: SelectionOperator.Is,
			location: SelectionLocation.Class,
			value: '',
		},
		resultLinkRule: {
			op: SelectionOperator.Is,
			location: SelectionLocation.Tag,
			value: '',
		},
	},
};
describe('Selecting documentRuleSets', () => {
	it('selects the ruleset if both body and specific rule match', () => {
		const html = `<div id='important'><p class='specific'>bla</p></div>`;
		const parsed = parse(html);
		const ruleSet = selectRuleSet(parsed, config);
		expect(ruleSet.id).to.eq('1');
	});
	it('selects the ruleset if only body matches', () => {
		const html = `<div id='important'><p>bla</p></div>`;
		const parsed = parse(html);
		const ruleSet = selectRuleSet(parsed, config);
		expect(ruleSet.id).to.eq('2');
	});
	it('selects the default empty ruleset', () => {
		const html = `<div><p>bla</p></div>`;
		const parsed = parse(html);
		const ruleSet = selectRuleSet(parsed, config);
		expect(ruleSet.id).to.eq('3');
	});
});
