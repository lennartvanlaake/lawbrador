//import { clearDB } from '../support/index';

describe("Test if it creates a new page", () => {
  before(() => {
    //clearDB();
  });

  it("Access index page", () => {
    const TEXT = "loos";
    cy.visit("/");
    cy.contains("Eurlex").should("be.visible");
    cy.get("#text-field").type(TEXT);
    cy.get("button").trigger("click");
    cy.contains("Gend").click();
  });
});
