import { parse } from '@legalthingy/parse/src/scraper';
const inputOne = `
	<div id='useful'>
		<div id='useless'>
			<li>doek<a href="/doek">mans</a></li>
		</div> 
	</div>
`;

describe('Test parseing', () => {
	it('Recognizes text inside a link', () => {
		const result = parse(inputOne);
		expect(result.data[0].text).to.eq('doek');
		expect(result.data[1].text).to.eq('mans');
		expect(result.data[1].href).to.eq('/doek');
		expect(result.chain.length).to.eq(4);
		expect(result.chain[1].id).to.eq('useless');
	});
});
