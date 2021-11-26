import cheerio, { Node, CheerioAPI } from 'cheerio';
import { eurlexHtml } from '../../fixtures/fixtures';

declare module 'cheerio' {
	interface Node {
		children?: Node[];
		data?: string;
	}
}

function getTextNodes(rootChildren: Node[], $: CheerioAPI): any[] {
	return rootChildren
		.flatMap((child) => getTextChildren(child, $))
		.filter((list) => list.length != 0);
}

function getTextChildren(node: Node, $: CheerioAPI): any[] {
	if (!node.children) {
		return [];
	}
	if (
		node.children.some(
			(child) => child?.type == 'text' && child?.data.trim(),
		)
	) {
		return [$(node).text()];
	}
	return node.children.flatMap((child) => getTextChildren(child, $));
}

describe('WIP', () => {
	it('wippin', () => {
		const $ = cheerio.load(eurlexHtml);
		const bodyChildren = $('body').children();
		const parsed = getTextNodes(bodyChildren.toArray(), $);
		console.log(parsed);
		expect(1).to.gt(0);
	});
});
