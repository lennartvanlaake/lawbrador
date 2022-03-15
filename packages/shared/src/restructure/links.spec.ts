import { logObject } from "..";
import { expect } from "chai";
import type { LinkNode, ListElementNode, TextNode , DocumentRuleSet} from "..";
import { parse } from "../parse/scraper";
import { applyRuleSet } from "./applyRuleSet";
import { eurlexConfig } from "..";

const sourceUrl = "http://source.url";
const ruleSet: DocumentRuleSet = {
  markupRules: [],
};

describe("test links", () => {
  it("replaces original id with new id in hashtag url", () => {
    const html = `
		<div id="original"><a href="http://source.url#original">link</a><p>stuff</p></div>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    const id = restructured.id;
    expect((restructured.children[0] as LinkNode).href).to.contain(id);
  });
});
