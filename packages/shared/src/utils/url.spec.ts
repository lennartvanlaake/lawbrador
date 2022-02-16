import type { UrlConfig } from "..";
import { buildUrl, extractUrlVariables } from "./url";
import { expect } from "chai";

const config: UrlConfig = {
  base: "http://text.com",
  pathComponents: [{ value: "static" }, { variableName: "var1" }],
  queryComponents: [
    {
      name: "static",
      urlComponent: { value: "x" },
    },
    {
      name: "dynamic",
      urlComponent: { variableName: "var2" },
    },
    {
      name: "empty",
      urlComponent: { variableName: "var3" },
    },
  ],
};

describe("Test if url building works", () => {
  it("Testing URL with path and query variables", () => {
    const output = buildUrl({ var1: "1", var2: "2 3" }, config);
    expect(output).to.eq("http://text.com/static/1?static=x&dynamic=2%203");
  });
  it("Throws if path param is not provided ", () => {
    expect(() => buildUrl({}, config)).to.throw;
  });
});

describe("Test if extracting variables from URL worls", () => {
  it("Testing URL with path and query variables", () => {
    const url = "http://text.com/static/1?static=x&dynamic=2%203";
    const output = extractUrlVariables(url, config);
    expect(output).to.eql({ var1: "1", var2: "2 3" });
  });
});
