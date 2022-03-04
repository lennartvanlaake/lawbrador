import { DocumentRuleSet, logObject } from "..";
import { expect } from "chai";
import { parse } from "../parse/scraper";
import { applyRuleSet } from "./applyRuleSet";
import { eurlexConfig } from "..";
const ruleSet: DocumentRuleSet = {};
const sourceUrl = "http://source.url";
describe("Bug regression tests", () => {
  it.only("Some text might not get displayed", () => {
    const html = `
		<p>
      			<span>DIRECTIVE</span>
				2006/54/EC
			<span>OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL</span>
   		</p>
		`;
    const result = applyRuleSet(parse(html), ruleSet, eurlexConfig, sourceUrl);
    logObject(result);
    expect(JSON.stringify(result)).to.contain("DIRECTIVE");
  });
});
