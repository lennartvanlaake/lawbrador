import { parseSearchResults, incrementPageNumber } from "./searcher";
import { parse } from "./scraper";
import { HtmlSearchRuleSet, SourceSiteConfig } from "./schemas/rules";
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
      resultRule: {
        op: "is",
        location: "class",
        value: "SearchResult",
      },
      resultLinkRule: {
        op: "is",
        location: "tag",
        value: "h2",
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

describe("Incrementing the page number", () => {
  const config: HtmlSearchRuleSet = {
    pageVariable: "page",
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
  };
  it("goes to the second page if no page number is provided", () => {
    const result = incrementPageNumber({}, config);
    expect(result[config.pageVariable]).to.eq("2");
  });
  it("goes to the third page if page number 2 is provided", () => {
    const result = incrementPageNumber({ page: "2" }, config);
    expect(result[config.pageVariable]).to.eq("3");
  });
  it("throws if a non-numeric page number is provided", () => {
    expect(() => incrementPageNumber({ page: "blabla" }, config)).to.throw;
  });
});
