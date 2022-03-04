
import type { DocumentRuleSet } from "..";
import { expect } from "chai";
import type { LinkNode, ListElementNode, TextNode } from "..";
import { parse } from "../parse/scraper";
import { applyRuleSet } from "./applyRuleSet";
import { eurlexConfig } from '..';

const sourceUrl = "http://source.url";
  const ruleSet: DocumentRuleSet = {
    markupRules: [],
  };



describe("Positively recognizing number and text", () => {
  it("Finds number inside text element", () => {
    const html = `
		<div><p>1 bla</p><p>bla</p><div>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    const ol = restructured.children[0];
    expect(ol.name).to.eq("ol");
    const listElement = ol.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
  });
  it("Finds first-child number in table", () => {
    const html = `
		<table><tr><td>1</td><td>b1a</td></tr><tr><td>2</td><td>b2a</td></tr></table>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    const ol = restructured.children[0]; 
    expect(ol.name).to.eq("ol");
    const listElement = ol.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
    expect((listElement.children[0].children[0] as TextNode).text).to.eq("b1a");
  });
  it("Finds number with number element inside paragraph", () => {
    const html = `
		<div><p><a>1</a>bla</p><p><a>2</a>bla</p></div>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    const ol = restructured.children[0]; 
    expect(ol.name).to.eq("ol");
    const listElement = ol.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
    expect((listElement.children[0] as TextNode).text).to.eq("bla");
  });
  it("Finds number with number element inside paragraph", () => {
    const html = `
		<div><p>1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>bla</i></p><p>bla</p></div>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    const ol = restructured.children[0]; 
    expect(ol.name).to.eq("ol");
    const listElement = ol.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
    expect((listElement.children[0].children[0] as TextNode).text).to.eq("bla");
  });
  it("Apply line number to two paragraphs", () => {
    const html = `
		<div>
			<div><p>1</p><p>bla</p><p>diebla</p></div>
			<div><p>2</p><p>bla</p></div>	
		</div>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    const ol = restructured.children[0]; 
    expect(ol.name).to.eq("ol");
    const listElement = ol.children[0] as ListElementNode;
    expect(listElement.name).to.eq("li");
    expect(listElement.marker.text).to.eq("1");
    expect((listElement.children[0].children[0] as TextNode).text).to.eq("bla");
  });
});

describe("Not having false positives", () => {

  it("Do not recoginize date as a line number", () => {
    const html = `
		<p>17.01.1992</p>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(restructured.name).to.eq('p');
  });
  it("Do not recognize number in link as line number", () => {
    const html = `
		<p>bla<a href='bladiebla'>(<span>1</span>)</a></p>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    expect(JSON.stringify(restructured)).not.to.include('marker');
  });

});

