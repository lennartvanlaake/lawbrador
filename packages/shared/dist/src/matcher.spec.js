"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const scraper_1 = require("./scraper");
const matcher_1 = require("./matcher");
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
    const parsed = (0, scraper_1.parse)(inputOne);
    it('Matches first element based on exact id match', () => {
        const rule = {
            op: 'is',
            location: 'id',
            value: 'usefull',
        };
        const firstMatched = (0, matcher_1.getFirstMatching)(parsed, rule);
        (0, chai_1.expect)(firstMatched.chain[0].id).to.eq('usefull');
    });
    it('Matches first element based on id includes', () => {
        const rule = {
            op: 'includes',
            location: 'id',
            value: 'full',
        };
        const firstMatched = (0, matcher_1.getFirstMatching)(parsed, rule);
        (0, chai_1.expect)(firstMatched.chain[0].id).to.eq('usefull');
    });
    it('Matches first element based on class', () => {
        const rule = {
            op: 'is',
            location: 'class',
            value: 'content',
        };
        const firstMatched = (0, matcher_1.getFirstMatching)(parsed, rule);
        (0, chai_1.expect)(firstMatched.chain[0].id).to.eq('usefull');
    });
    it('Matches first element based on tag', () => {
        const rule = {
            op: 'is',
            location: 'tag',
            value: 'ul',
        };
        const firstMatched = (0, matcher_1.getFirstMatching)(parsed, rule);
        (0, chai_1.expect)(firstMatched.chain[0].name).to.eq('ul');
    });
});
describe('Test matching all elements', () => {
    const parsed = (0, scraper_1.parse)(inputOne);
    it('Matches all leaf node elements', () => {
        const rule = {
            op: 'is',
            location: 'class',
            value: 'text',
        };
        const matched = (0, matcher_1.getAllMatching)(parsed, rule);
        (0, chai_1.expect)(matched.length).to.eq(3);
    });
    it('Matches all organisation nodes', () => {
        const rule = {
            op: 'is',
            location: 'class',
            value: 'content',
        };
        const matched = (0, matcher_1.getAllMatching)(parsed, rule);
        (0, chai_1.expect)(matched.length).to.eq(2);
    });
});
//# sourceMappingURL=matcher.spec.js.map