"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./scraper");
const chai_1 = require("chai");
const inputOne = `
	<div id='useful'>
		<div id='useless'>
			<li>doek<a href="/doek">mans</a></li>
		</div> 
	</div>
`;
describe('Test basic parseing', () => {
    it('Recognizes text inside a link', () => {
        const result = (0, scraper_1.parse)(inputOne);
        (0, chai_1.expect)(result.data[0].text).to.eq('doek');
        (0, chai_1.expect)(result.data[1].text).to.eq('mans');
        (0, chai_1.expect)(result.data[1].href).to.eq('/doek');
        (0, chai_1.expect)(result.chain.length).to.eq(4);
        (0, chai_1.expect)(result.chain[1].id).to.eq('useless');
    });
});
//# sourceMappingURL=scraper.spec.js.map