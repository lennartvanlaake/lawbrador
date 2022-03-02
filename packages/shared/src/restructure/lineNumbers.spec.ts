
import type { DocumentRuleSet } from "..";
import { expect } from "chai";
import type { LinkNode, ListElementNode, TextNode } from "..";
import { parse } from "../parse/scraper";
import { applyRuleSet } from "./applyRuleSet";
import { eurlexConfig } from '..';

const sourceUrl = "http://source.url";
describe("Recognizing lists", () => {
  it("Finds number inside text element", () => {
  const ruleSet: DocumentRuleSet = {
    markupRules: [
      {
        tag: "li-marker",
        filter: {
          op: "includes",
          location: "text",
          value: "\\d+",
        },
      },
    ],
  };
    const html = `
		<p>1 bla</p>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(restructured.name).to.eq("ol");
    const listElement = restructured.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
  });
  it("Finds first-child number in table", () => {
  const ruleSet: DocumentRuleSet = {
    markupRules: [
      {
        tag: "li-marker",
        filter: {
          op: "is",
          location: "text",
          value: "\\d+",
	  nestedRule: {
		op: "is",
		location: "childIndex",
		value: 0
	  }
        },
      },
    ],
  };
    const html = `
		<table><tr><td>1</td><td>b1a</td></tr></table>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(restructured.name).to.eq("ol");
    const listElement = restructured.children[0] as ListElementNode;
    debugger;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
    expect((listElement.children[0].children[0] as TextNode).text).to.eq("b1a");
  });
  it("Finds number with number element inside paragraph", () => {
  const ruleSet: DocumentRuleSet = {
    markupRules: [
      {
        tag: "li-marker",
        filter: {
          op: "is",
          location: "text",
          value: "\\d+",
        },
      },
    ],
  };
    const html = `
		<p><a>1</a>bla</p>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(restructured.name).to.eq("ol");
    const listElement = restructured.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
    expect((listElement.children[0] as TextNode).text).to.eq("bla");
  });
  it("Finds number with number element inside paragraph", () => {
  const ruleSet: DocumentRuleSet = {
    markupRules: [
      {
        tag: "li-marker",
        filter: {
          op: "is",
          location: "text",
          value: "\\d+",
        },
      },
    ],
  };
    const html = `
		<p>1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>bla</i></p>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(restructured.name).to.eq("ol");
    const listElement = restructured.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
    expect((listElement.children[0].children[0] as TextNode).text).to.eq("bla");
  });
  it("Apply line number to two paragraphs", () => {
  const ruleSet: DocumentRuleSet = {
    markupRules: [
      {
        tag: "li-marker",
        filter: {
          op: "is",
          location: "text",
          value: "\\d+",
        },
      },
    ],
  };
    const html = `
		</div><p>1</p><p>bla</p><p>diebla</p></div>	
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(restructured.name).to.eq("ol");
    const listElement = restructured.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
  });
});
