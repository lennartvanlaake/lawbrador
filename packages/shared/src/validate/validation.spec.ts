import { expect } from "chai";
import type { UrlComponent } from "..";
import { Schemas } from "..";
import { ajv } from "./ajv";

describe("Validation testing", () => {
  it("Rejects component without required properties", () => {
    const result = ajv.validate(Schemas.urlComponent, {});
    expect(result).to.eq(false);
  });
  it("Validates url component without optional properties", () => {
    const comp: UrlComponent = { variableName: "x" };
    const result = ajv.validate(Schemas.urlComponent, comp);
    expect(result).to.eq(true);
  });
});
