import { parse } from './scraper';
import { expect } from 'chai';
const inputOne = `
	<div id='id' class="class">
		<li>doek<a href="/doek">mans</a></li>
	</div>
`;

describe('Test basic parseing', () => {
	it('Recognizes text inside a link', () => {
		const result = parse(inputOne);
		debugger;
		// cheerio uses an implicit body node for html snippets
		expect(result.name).to.eq('body');
		const level1 = result.children[0];
		expect(level1.name).to.eq('div');
		expect(level1.id).to.eq('id');
		expect(level1.class).to.eq('class');
		const level2 = level1.children[0];
		expect(level2.name).to.eq('li');
		expect(level2.children[0].text).to.eq('doek');
		expect(level2.children[1].href).to.eq('/doek');
		const level3 = level2.children[1];
		expect(level3.children[0].text).to.eq('mans');
	});
});
