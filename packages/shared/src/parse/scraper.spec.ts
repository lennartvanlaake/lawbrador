import { parse } from './scraper';
import { expect } from 'chai';
import {logObject} from '..';
const inputOne = `
	<div id='id1' class="class1">
		<div id='id2' class="class2">
			<li>doek<a href="/doek">mans</a></li>
		</div>
	</div>
`;

describe('Full example', () => {
	it('Recognizes text inside a link', () => {
		const result = parse(inputOne);
		expect(result.childIndex).to.eq(0);
		expect(result.classes).contains("class1");
		expect(result.classes).contains("class2");
		expect(result.tags).contains("div");
		expect(result.tags).contains("li");
		expect(result.ids).contains("id1");
		expect(result.ids).contains("id2");
		expect(result.children[0].childIndex).to.eq(0);
		expect(result.children[0].text).to.eq("doek");
		expect(result.children[1].tags).contains("a");
		expect(result.children[1].href).to.eq("/doek");
		expect(result.children[1].children[0].text).to.eq("mans");
		expect(result.children[1].childIndex).to.eq(1);
	});
});

describe('Scraping bugfix regressions', () => {
	it.only('Text gets not displayed', () => {
		const html = `
		<p>
      			<span>DIRECTIVE</span>
				2006/54/EC
			<span>OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL</span>
   		</p>
		`
		const result = parse(html);
		expect(JSON.stringify(result)).to.contain("DIRECTIVE");
	});
});
