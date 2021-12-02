import { parse } from '@legalthingy/parse/src/scraper';
import {
	SelectionRule,
	SelectionLocation,
	SelectionOperator,
} from '@legalthingy/shared/schemas/rules';
import {
	getFirstMatching,
	getAllMatching,
} from '@legalthingy/parse/src/matcher';

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
			op: SelectionOperator.Is,
			location: SelectionLocation.Id,
			value: 'usefull',
		};
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.chain[0].id).to.eq('usefull');
	});
	it('Matches first element based on id includes', () => {
		const rule: SelectionRule = {
			op: SelectionOperator.Includes,
			location: SelectionLocation.Id,
			value: 'full',
		};
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.chain[0].id).to.eq('usefull');
	});
	it('Matches first element based on class', () => {
		const rule: SelectionRule = {
			op: SelectionOperator.Is,
			location: SelectionLocation.Class,
			value: 'content',
		};
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.chain[0].id).to.eq('usefull');
	});
	it('Matches first element based on tag', () => {
		const rule: SelectionRule = {
			op: SelectionOperator.Is,
			location: SelectionLocation.Tag,
			value: 'ul',
		};
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.chain[0].name).to.eq('ul');
	});
});

describe('Test matching all elements', () => {
	const parsed = parse(inputOne);
	it('Matches all leaf node elements', () => {
		const rule: SelectionRule = {
			op: SelectionOperator.Is,
			location: SelectionLocation.Class,
			value: 'text',
		};
		const matched = getAllMatching(parsed, rule);
		expect(matched.length).to.eq(3);
	});
	it('Matches all organisation nodes', () => {
		const rule: SelectionRule = {
			op: SelectionOperator.Is,
			location: SelectionLocation.Class,
			value: 'content',
		};
		const matched = getAllMatching(parsed, rule);
		expect(matched.length).to.eq(2);
	});
	console.log('x');
});
