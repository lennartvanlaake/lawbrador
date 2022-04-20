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
    const html = "<p>hi</p><p>bi</p>";
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
    expect(renderedDocument.strippedString).to.eq("hibi");
    expect(renderedDocument.toHtmlString()).to.contain("h<i>i</i>");
    expect(renderedDocument.toHtmlString()).to.contain("b<i>i</i>");
  });
  it("wrapping second match", () => {
    const html = "<p>hoooi</p><p>boooi</p>";
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
    renderedDocument.wrapNthMatch("oooi", 1, pre, post);
    expect(renderedDocument.toHtmlString()).to.contain("hoooi");
    expect(renderedDocument.toHtmlString()).to.contain("b<i>oooi</i>");
  });
});
