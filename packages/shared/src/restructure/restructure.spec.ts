import type { DocumentRuleSet } from "..";
import { expect } from "chai";
import type { LinkNode, ListElementNode, TextNode } from "..";
import { parse } from "../parse/scraper";
import { applyRuleSet } from "./applyRuleSet";
import { eurlexConfig } from '..';
function log(obj: any) {
  console.dir(obj, { colors: true, depth: null });
}

const sourceUrl = "http://source.url";
describe("Restructuring HTML with empty ruleset", () => {
  const ruleSet: DocumentRuleSet = {};
  it("Restructuring two paragraphs", () => {
    const html = `<p>bla</p><p>bla</p>`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(restructured.children.length).to.eq(2);
    expect(restructured.children.every((n) => n.name == "p")).to.be.true;
    expect(
      restructured.children.every(
        (n) => (n.children[0] as TextNode).text == "bla"
      )
    ).to.be.true;
  });
  it("Restructuring paragraphs with link", () => {
    const html = `<p><a href='somewhere'>bla<a></p><p>bla</p>`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    ;
    expect(
      restructured.children.every(
	(n) => (n.children[0] as TextNode).text == "bla" 
      )
    ).to.be.true;
    const link = restructured.children[0] as LinkNode;
    expect(link.name).to.eq("a");
    const target = encodeURIComponent(`${sourceUrl}/somewhere`);
    expect(link.href).to.eq(`./document?url=${target}&sourceConfigId=${eurlexConfig._id}`);
  });
  it("Restructuring two divs with two paragraphs each", () => {
    const html = `
			<div><p>bla</p><p>bla</p></div>
			<div><p>bla</p><p>bla</p></div>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(restructured.children[0].name).to.eq("div");
    expect(restructured.children[0].children[0].name).to.eq("p");
  });
  it("Ignore divs with only one child", () => {
    const html = `
			<div><div><p>bla</p></div></div>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
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
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(restructured.children.length).to.eq(2);
    expect(restructured.children.every((n) => n.name == "p")).to.be.true;
    expect(
      restructured.children.every(
        (n) => (n.children[0] as TextNode).text == "bla"
      )
    ).to.be.true;
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
    const restructured = applyRuleSet(parsed, ruleSet,eurlexConfig, sourceUrl );
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
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(restructured.name).to.eq("ol");
    const listElement = restructured.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
  });
  it("Finds number inside text element", () => {
    const html = `
		<table><tr><td>1</td><td>bla</td></tr></table>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(restructured.name).to.eq("ol");
    const listElement = restructured.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
  });
  it("Apply line number to two paragraphs", () => {
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
