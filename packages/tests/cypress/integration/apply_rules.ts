import { applyRuleSet } from '@legalthingy/parse/src/rule_applyer';
import { parse } from '@legalthingy/parse/src/scraper';
import {
	SelectionLocation,
	SelectionOperator,
	SourceSiteConfig,
	DocumentRuleSet,
} from '@legalthingy/shared/schemas/rules';

describe('Restructuring HTML with empty ruleset', () => {
	const ruleSet: DocumentRuleSet = {
		id: '1',
		conditionRules: [],
	};
	it('Restructuring two paragraphs', () => {
		const html = `<p>bla</p><p>bla</p>`;
		const parsed = parse(html);
		const restructured = applyRuleSet(parsed, ruleSet);
		expect(restructured.length).to.eq(2);
		expect(restructured.every((n) => n.name == 'p')).to.be.true;
		expect(restructured.every((n) => n.children[0].text == 'bla'))
			.to.be.true;
	});
	it('Restructuring paragraphs with link', () => {
		const html = `<p><a href='somewhere'>bla<a></p><p>bla</p>`;
		const parsed = parse(html);
		const restructured = applyRuleSet(parsed, ruleSet);
		expect(restructured.every((n) => n.children[0].text == 'bla'))
			.to.be.true;
		expect(restructured[0].children[0].name).to.eq('a');
		expect(restructured[0].children[0].href).to.eq('somewhere');
	});
	it('Restructuring two divs with two paragraphs each', () => {
		const html = `
			<div><p>bla</p><p>bla</p></div>
			<div><p>bla</p><p>bla</p></div>
		`;
		const parsed = parse(html);
		const restructured = applyRuleSet(parsed, ruleSet);
		expect(restructured[0].name).to.eq('div');
		expect(restructured[0].children[0].name).to.eq('p');
		expect(restructured[0].children[0].children[0].text).to.eq(
			'bla',
		);
	});
});
describe('Restructuring HTML with body rule', () => {
	const ruleSet: DocumentRuleSet = {
		id: '1',
		conditionRules: [],
		bodyRule: {
			op: SelectionOperator.Is,
			location: SelectionLocation.Id,
			value: 'root',
		},
	};
	it('Two paragraphs in root element', () => {
		const html = `
		<div id='root'><p>bla</p><p>bla</p></div>
		<div><p>irrelevant bla</p></div>
		`;
		const parsed = parse(html);
		const restructured = applyRuleSet(parsed, ruleSet);
		expect(restructured.length).to.eq(2);
		expect(restructured.every((n) => n.name == 'p')).to.be.true;
		expect(restructured.every((n) => n.children[0].text == 'bla'))
			.to.be.true;
	});
});
