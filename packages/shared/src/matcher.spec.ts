import { expect } from 'chai';
import { parse } from './scraper';
import { SelectionRule } from './schemas/rules';
import { getFirstMatching, getAllMatching } from './matcher';

const inputOne = `
	<div id='useless'>
		<div><script>stufffff</script></div>
		<div><img href="blaaa"/></div>
		<div id='usefull' class='content'>
			<ul>
				<p class='text'>text</p>			
				<p class='text'>actual text</p>		
			</ul>
			<div class='content'>
				<p class='text'>even more text</p>		
			</div>
		</div> 
	</div>
`;

describe('Test matching first element', () => {
	const parsed = parse(inputOne);
	it('Matches first element based on exact id match', () => {
		const rule: SelectionRule = {
			op: 'is',
			location: 'id',
			value: 'usefull',
		};
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.id).to.eq('usefull');
	});
	it('Matches first element based on id includes', () => {
		const rule: SelectionRule = {
			op: 'includes',
			location: 'id',
			value: 'full',
		};
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.id).to.eq('usefull');
	});
	it('Matches first element based on class', () => {
		const rule: SelectionRule = {
			op: 'is',
			location: 'class',
			value: 'content',
		};
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.id).to.eq('usefull');
	});
	it('Matches first element based on text content', () => {
		const rule: SelectionRule = {
			op: 'is',
			location: 'text',
			value: 'even more text',
		};
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.text).to.eq('even more text');
	});
	it('Matches first element based on text regex', () => {
		const rule: SelectionRule = {
			op: 'regex',
			location: 'text',
			value: '.ext',
		};
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.text).to.eq('text');
	});
	it('Matches first element based on tag', () => {
		const rule: SelectionRule = {
			op: 'is',
			location: 'tag',
			value: 'ul',
		};
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.name).to.eq('ul');
	});
});

describe('Test matching all elements', () => {
	const parsed = parse(inputOne);
	it('Matches all leaf node elements', () => {
		const rule: SelectionRule = {
			op: 'is',
			location: 'class',
			value: 'text',
		};
		const matched = getAllMatching(parsed, rule);
		expect(matched.length).to.eq(3);
	});
	it('Matches all organisation nodes', () => {
		const rule: SelectionRule = {
			op: 'is',
			location: 'class',
			value: 'content',
		};
		const matched = getAllMatching(parsed, rule);
		expect(matched.length).to.eq(2);
	});
});
