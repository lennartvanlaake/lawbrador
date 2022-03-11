
import { DocumentRuleSet, logObject } from "..";
import { expect } from "chai";
import type { LinkNode, ListElementNode, TextNode } from "..";
import { parse } from "../parse/scraper";
import { applyRuleSet } from "./applyRuleSet";
import { eurlexConfig } from "..";

const sourceUrl = "http://source.url";
const ruleSet: DocumentRuleSet = {
  markupRules: [],
};


describe("test links", () => {
   it.only("replaces original id with new id in hashtag url", () => {
    const html = `
		<div id="original"><a href="http://source.url#original">link</a></div>
		`;
    const parsed = parse(html);
    const restructured = applyRuleSet(parsed, ruleSet, eurlexConfig, sourceUrl);
    logObject(restructured);
   })
})
