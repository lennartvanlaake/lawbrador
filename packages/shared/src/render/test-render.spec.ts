import { expect } from "chai";
import {defaultRestructure} from "..";
import { renderNode } from './index';

describe("Rendering html from a RestructuredNode", () => {
	it("One node with a word", () => {
		const html = "<p>hi</p>";
	 	const rendered = renderNode(defaultRestructure(html));
		expect(rendered).to.contain("hi");
	});
});
