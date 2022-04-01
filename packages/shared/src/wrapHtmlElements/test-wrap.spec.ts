import { expect } from "chai";
import { wrapElements } from "./index";

describe("wrapping search terms in html elements", () => {
  const start = "<x>";
  const end = "</x>";
  it("wraps plain text", () => {
    const html = "<p>bla</p>";
    const result = wrapElements(html, "bla", start, end);
    expect(result).to.eq(`<p>${start}bla${end}</p>`);
  });
  // no longer expected behavior
  //it("wraps all search  terms", () => {
  //const html = "<p>bla die iets</p>";
  //const result = wrapElements(html, "bla iets", start, end);
  //expect(result).to.eq(`<p>${start}bla${end} die ${start}iets${end}</p>`);
  //});
  //it("wraps match containig element", () => {
  //const html = "<p>b<i>l</i>a</p>";
  //const result = wrapElements(html, "bla iets", start, end);
  //expect(result).to.eq(`<p>${start}b<i>l</i>a${end}</p>`);
  //});
  it("wraps multi-word term in one element", () => {
    const html = "<p>bla iets</p>";
    const result = wrapElements(html, "bla iets", start, end);
    expect(result).to.eq(`<p>${start}bla iets${end}</p>`);
  });
});
