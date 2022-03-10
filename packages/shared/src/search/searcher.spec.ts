import { parseSearchResults } from "./search";
import { parse } from "../parse/scraper";
import type { SourceSiteConfig } from "..";
import { expect } from "chai";

describe("Test searching", () => {
  const demoHtml = `
		<div><script>randomstuff</script></div>
		<div class='EurlexContent'>
			<div class='SearchResult'>
				<h2><a href='./legalcontentsomething'>casename</a><h2>
			</div>
		</div>
	`;
  const config: SourceSiteConfig = {
    _id: "123",
    name: "test",
    searchUrlConfig: {
      base: "http://text.com",
      pathComponents: [],
      queryComponents: [],
    },
    documentUrlConfig: {
      base: "http://text.com",
      pathComponents: [],
      queryComponents: [],
    },
    documentRuleSets: [],
    htmlSearchRuleSet: {
      pageVariable: "",
      queryVariable: "",
      resultListRule: {
        op: "is",
        location: "class",
        value: "EurlexContent",
      },
      resultLinkRule: {
        op: "includes",
        location: "link",
        value: "legal",
      },
    },
  };

  it("Parsing search results works for eurlex", () => {
    const parsed = parse(demoHtml);
    const result = parseSearchResults(parsed, config);

    expect(result[0].href).to.be.ok;
    expect(result[0].text).to.be.ok;
  });
});
