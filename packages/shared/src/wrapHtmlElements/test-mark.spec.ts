import { expect } from "chai";
import { getMarkingFromSelection } from "./index";

describe("Marker functionality", () => {
  it("get marking for first occurance", () => {
    const html = `<p id="1">allemaal mooie tekst</p>"`;
    const text = "mooie";
    const selection = createSelectionObject(text, "1", 9);
    const marking = getMarkingFromSelection(html, selection);
    expect(marking.markedText).to.eq(text);
    expect(marking.occuranceIndex).to.eq(0);
  });
  it("get marking for second occurance", () => {
    const html = `<div><p>such empty</p></div><p id="1">allemaal mooie mooie tekst</p><div></div>`;
    const text = "mooie";
    const selection = createSelectionObject(text, "1", 15);
    const marking = getMarkingFromSelection(html, selection);
    expect(marking.markedText).to.eq(text);
    expect(marking.occuranceIndex).to.eq(1);
  });
});

function createSelectionObject(
  selectedString: string,
  parentId: string,
  offset: number
): Selection {
  const selection = {
    anchorNode: {
      parentElement: {
        id: parentId,
      },
    },
    anchorOffset: offset,
    toString: () => selectedString,
  };
  return selection as any;
}
