import { expect } from "chai";
import type { TagOrText } from "..";
import { defaultRestructure, nodeToTextAndTags } from "..";
import { RenderedDocument } from "./RenderedDocument";
describe("Test rendered document", () => {
  it("Node to renderedDocument", () => {
    const html = "<div><p>hi</p><p>hoi</p></div>";
    const array = nodeToTextAndTags(defaultRestructure(html));
    const renderedDocument = new RenderedDocument(array);
    expect(renderedDocument.strippedString).to.eq("hihoi");
    expect(array.length).to.eq(8);
  });
  it("wrapping in renderedDocument", () => {
    const html = "<p>hi</p>";
    const array = nodeToTextAndTags(defaultRestructure(html));
    const renderedDocument = new RenderedDocument(array);
    const pre: TagOrText = {
      id: "1",
      origin: "marker",
      text: "<i>",
      type: "open",
    };
    const post: TagOrText = {
      id: "1",
      origin: "marker",
      text: "</i>",
      type: "close",
    };
    renderedDocument.wrapAllMatching("i", pre, post);
    expect(renderedDocument.strippedString).to.eq("hi");
    expect(renderedDocument.toHtmlString()).to.contain("h<i>i</i>");
  });
});
