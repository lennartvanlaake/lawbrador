import { parse } from './scraper';
import { expect } from 'chai';
const inputOne = `
	<div id='id1' class="class1">
		<div id='id2' class="class2">
			<li>doek<a href="/doek">mans</a></li>
		</div>
	</div>
`;

describe('Test basic parseing', () => {
	it('Recognizes text inside a link', () => {
		const result = parse(inputOne);
		expect(result.classes).contains("class1");
		expect(result.classes).contains("class2");
		expect(result.tags).contains("div");
		expect(result.tags).contains("li");
		expect(result.ids).contains("id1");
		expect(result.ids).contains("id2");
		expect(result.children[0].text).to.eq("doek");
		expect(result.children[1].tags).contains("a");
		expect(result.children[1].href).to.eq("/doek");
		expect(result.children[1].children[0].text).to.eq("mans");
	});
});
