import { applyRuleSet, selectRuleSet } from "./rule_applyer";
import { parse } from "./scraper";
import { DocumentRuleSet, SourceSiteConfig } from "./schemas/rules";
import { expect } from "chai";

describe("Restructuring HTML with empty ruleset", () => {
  const ruleSet: DocumentRuleSet = {
    conditionRules: [],
  };
  it("Restructuring two paragraphs", () => {
    const html = `<p>bla</p><p>bla</p>`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet);
    expect(restructured.children.length).to.eq(2);
    expect(restructured.children.every((n) => n.name == "p")).to.be.true;
    expect(restructured.children.every((n) => n.children[0].text == "bla")).to
      .be.true;
  });
  it("Restructuring paragraphs with link", () => {
    const html = `<p><a href='somewhere'>bla<a></p><p>bla</p>`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet);
    expect(restructured.children.every((n) => n.children[0].text == "bla")).to
      .be.true;
    expect(restructured.children[0].children[0].name).to.eq("a");
    expect(restructured.children[0].children[0].href).to.eq("somewhere");
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
    expect(restructured.children[0].children[0].children[0].text).to.eq("bla");
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
    expect(restructured.children.every((n) => n.children[0].text == "bla")).to
      .be.true;
  });
});

describe("Recognizing headers from ruleset", () => {
  const ruleSet: DocumentRuleSet = {
    conditionRules: [],
    markupRules: [
      {
        notation: "h1",
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
    console.log(JSON.stringify(restructured));
    expect(restructured.name).to.eq("h1");
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
    resultRule: {
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
