describe("Game", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should play to the 2nd level and then lose", () => {
    cy.get("body").within(() => {
      // There's also a <title> element with the same text
      cy.queryByText("Game of Shells").should("be.visible");
    });
    cy.queryByText("Start").should("be.visible");

    cy.queryByText("Start").click();

    cy.queryByText("Level 1").should("be.visible");
    cy.queryByText("Start").should("not.be.visible");
    cy.get("body").within(() => {
      // There's also a <title> element with the same text
      cy.queryByText("Game of Shells").should("not.be.visible");
    });

    cy.findAllByLabelText("Container").should("have.length", 3);

    cy.queryByTestId("selected-container").should("be.visible");
    cy.findByText("Which one?", { timeout: 10000 }).should("be.visible");

    cy.queryByTestId("selected-container").click();
    cy.findByText("Correct!", { timeout: 10000 }).should("be.visible");
    cy.queryByText("Which one?").should("not.be.visible");

    cy.findByText("Level 2").should("be.visible");
    cy.queryByText("Level 1").should("not.be.visible");

    cy.findByText("Which one?", { timeout: 10000 });
    cy.findAllByLabelText("Container")
      .not("[data-testid=selected-container]")
      .first()
      .click();

    cy.findByText("Wrong!").should("be.visible");
    cy.queryByText("Which one?").should("not.be.visible");

    cy.findByText("GAME OVER").should("be.visible");
    cy.queryByText("Wrong!").should("not.be.visible");
    cy.queryAllByLabelText("Container").should("not.be.visible");

    cy.findByText("continue").should("be.visible");
    cy.findByText("continue").click();

    cy.get("body").within(() => {
      // There's also a <title> element with the same text
      cy.queryByText("Game of Shells").should("be.visible");
    });
    cy.queryByText("Start").should("be.visible");
    cy.queryByText("Top level: 1").should("be.visible");
  });
});
