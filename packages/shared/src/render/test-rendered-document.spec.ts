import { expect } from "chai";
import { id, TagOrText } from "..";
import { defaultRestructure, nodeToTextAndTags } from "..";
import { RenderedDocument } from "./RenderedDocument";
describe("Test rendered document", () => {
  it("Node to renderedDocument", () => {
    const html = "<div><p>hi</p><p>hoi</p></div>";
    const array = nodeToTextAndTags(defaultRestructure(html));
    const renderedDocument = new RenderedDocument(array, "test");
    expect(renderedDocument.strippedString).to.eq("hihoi");
    expect(array.length).to.eq(8);
  });
  it("wrapping in renderedDocument", () => {
    const html = "<p>hi</p><p>bi</p>";
    const array = nodeToTextAndTags(defaultRestructure(html));
    const renderedDocument = new RenderedDocument(array, "test");
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
    
    renderedDocument.wrapAllMatching("i", pre, post, id());
    expect(renderedDocument.strippedString).to.eq("hibi");
    expect(renderedDocument.htmlString).to.contain("h</span><i>");
    expect(renderedDocument.htmlString).to.contain("i</span></i>");
    expect(renderedDocument.htmlString).to.contain("b</span><i>");
    expect(renderedDocument.htmlString).to.contain("i</span></i>");
  });
  it("wrapping selection", () => {
    const html = "<p>hoooi</p><p>boooi</p>";
    const restructured = defaultRestructure(html);
    restructured.children[0].id = "2";
    restructured.children[1].id = "3";
    const array = nodeToTextAndTags(restructured);
    const selection: Selection = {
      anchorNode: {
        //@ts-ignore
        parentElement: {
          id: "2",
        },
      },
      anchorOffset: 1,
      focusNode: {
        //@ts-ignore
        parentElement: {
          id: "3",
        },
      },
      focusOffset: 2,
    };
    const renderedDocument = new RenderedDocument(array, "test");
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
    const positions = renderedDocument.positionsFromSelection(selection)
    renderedDocument.wrapPositions(positions, pre, post, id());
    expect(renderedDocument.htmlString).to.contain("h</span><i>");
    expect(renderedDocument.htmlString).to.contain("bo</span></i>");
  });
});
