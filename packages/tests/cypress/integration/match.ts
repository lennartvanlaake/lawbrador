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
				<div>
					<p class='text'>text</p>			
					<p class='text'>actual text</p>		
				</div>
			</ul>
			<div>
				<p class='text'>even more text</p>		
			</div>
		</div> 
	</div>
`;

describe('Test matching first element', () => {
	it('Matches first element based on exact id match', () => {
		const parsed = parse(inputOne);
		const rule: SelectionRule = {
			op: SelectionOperator.Is,
			location: SelectionLocation.Id,
			value: 'usefull',
		};
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.chain[0].id).to.eq('usefull');
	});
	it('Matches first element based on id includes', () => {
		const parsed = parse(inputOne);
		const rule: SelectionRule = {
			op: SelectionOperator.Includes,
			location: SelectionLocation.Id,
			value: 'full',
		};
		console.log('bla');
		const firstMatched = getFirstMatching(parsed, rule);
		expect(firstMatched.chain[0].id).to.eq('usefull');
	});
});
