import { applyRuleSet, selectRuleSet } from "./rule_applyer";
import { parse } from "./scraper";
import { DocumentRuleSet, SourceSiteConfig } from "./schemas/rules";
import { expect } from "chai";
import {LinkNode, ListElementNode, TextNode} from "./schemas/scrape";
function log(obj: any) {
  console.dir(obj, { colors: true, depth: null });
}

describe("Restructuring HTML with empty ruleset", () => {
  const ruleSet: DocumentRuleSet = {};
  it("Restructuring two paragraphs", () => {
    const html = `<p>bla</p><p>bla</p>`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet);
    expect(restructured.children.length).to.eq(2);
    expect(restructured.children.every((n) => n.name == "p")).to.be.true;
    expect(restructured.children.every((n) => (n.children[0] as TextNode).text == "bla")).to
      .be.true;
  });
  it("Restructuring paragraphs with link", () => {
    const html = `<p><a href='somewhere'>bla<a></p><p>bla</p>`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet);
    debugger;
    expect(restructured.children.every((n) => (n.children[0] as TextNode).text == "bla")).to
      .be.true;
    const link = restructured.children[0] as LinkNode;
    expect(link.name).to.eq("a");
    expect(link.href).to.eq("somewhere");
  });
  it("Restructuring two divs with two paragraphs each", () => {
    const html = `
			<div><p>bla</p><p>bla</p></div>
			<div><p>bla</p><p>bla</p></div>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet);
    expect(restructured.children[0].name).to.eq("div");
    expect(restructured.children[0].children[0].name).to.eq("p");
  });
  it("Ignore divs with only one child", () => {
    const html = `
			<div><div><p>bla</p></div></div>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet);
    expect(restructured.name).to.eq("p");
    expect(restructured.children[0].name).to.eq("text");
  });
});

describe("Restructuring HTML with body rule", () => {
  const ruleSet: DocumentRuleSet = {
    conditionRules: [],
    bodyRule: {
      op: "is",
      location: "id",
      value: "root",
    },
  };
  it("Two paragraphs in root element", () => {
    const html = `
		<div id='root'><p>bla</p><p>bla</p></div>
		<div><p>irrelevant bla</p></div>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet);
    expect(restructured.children.length).to.eq(2);
    expect(restructured.children.every((n) => n.name == "p")).to.be.true;
    expect(restructured.children.every((n) => (n.children[0] as TextNode).text == "bla")).to
      .be.true;
  });
});

describe("Recognizing headers", () => {
  const ruleSet: DocumentRuleSet = {
    markupRules: [
      {
        tag: "h1",
        filter: {
          op: "includes",
          location: "class",
          value: "title",
        },
      },
    ],
  };
  it("Works on single element", () => {
    const html = `
		<p class="title">bla</p>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet);
    expect(restructured.name).to.eq("h1");
  });
});

describe("Recognizing lists", () => {
  const ruleSet: DocumentRuleSet = {
    markupRules: [
      {
        tag: "li-marker",
        filter: {
          op: "regex",
          location: "text",
          value: "\\d+",
        },
      },
    ],
  };
  it("Finds number inside text element", () => {
    const html = `
		<p>1 bla</p>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet);
    expect(restructured.name).to.eq("ol");
    const listElement = restructured.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
  });
  it.only("Finds number inside text element", () => {
    const html = `
		<table><tr><td>1</td><td>bla</td</td></tr></table>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet);
    log(restructured);
    debugger; 
    expect(restructured.name).to.eq("ol");
    const listElement = restructured.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
  });
});

const sourceConfig: SourceSiteConfig = {
  _id: "1",
  name: "test",
  searchUrlConfig: {
    base: "http://x.nl",
    pathComponents: [],
    queryComponents: [],
  },
  documentUrlConfig: {
    base: "http://x.nl",
    pathComponents: [],
    queryComponents: [],
  },
  documentRuleSets: [
    {
      name: "1",
      conditionRules: [
        {
          op: "is",
          location: "class",
          value: "specific",
        },
      ],
      bodyRule: {
        op: "is",
        location: "id",
        value: "important",
      },
    },
    {
      name: "2",
      conditionRules: [],
      bodyRule: {
        op: "is",
        location: "id",
        value: "important",
      },
    },
    {
      name: "3",
    },
  ],
  // irrelevant to this test
  htmlSearchRuleSet: {
    pageVariable: "",
    queryVariable: "",
    resultListRule: {
      op: "is",
      location: "class",
      value: "",
    },
    resultLinkRule: {
      op: "is",
      location: "tag",
      value: "",
    },
  },
};
describe("Selecting documentRuleSets", () => {
  it("selects the ruleset if both body and specific rule match", () => {
    const html = `<div id='important'><p class='specific'>bla</p></div>`;
    const parsed = parse(html);
    const ruleSet = selectRuleSet(parsed, sourceConfig);
    expect(ruleSet.name).to.eq("1");
  });
  it("selects the ruleset if only body matches", () => {
    const html = `<div id='important'><p>bla</p></div>`;
    const parsed = parse(html);
    const ruleSet = selectRuleSet(parsed, sourceConfig);
    expect(ruleSet.name).to.eq("2");
  });
  it("selects the default empty ruleset", () => {
    const html = `<div><p>bla</p></div>`;
    const parsed = parse(html);
    const ruleSet = selectRuleSet(parsed, sourceConfig);
    expect(ruleSet.name).to.eq("3");
  });
});
