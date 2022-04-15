import { expect } from "chai";
import { defaultRestructure } from "..";
import { renderNode, renderText } from "./index";
describe("Test rendered document", () => {
  it("One node with a word", () => {
    const html = "<p>hi</p>";
    const rendered = renderNode(defaultRestructure(html));
    expect(rendered).to.contain("hi");
  });
});

describe("Rendering text from a RestructuredNode", () => {
  it("One node with a word", () => {
    const html = "<p>hi</p>";
    const rendered = renderText(defaultRestructure(html));
    expect(rendered).to.eq("hi");
  });
});