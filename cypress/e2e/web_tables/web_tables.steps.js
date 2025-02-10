const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("que acesso a página {string}", (url) => {
  cy.visit(url);
});

When("adiciono 12 novos registros com os seguintes dados:", (dataTable) => {
  dataTable.hashes().forEach((row) => {
    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(row["First Name"]);
    cy.get("#lastName").type(row["Last Name"]);
    cy.get("#userEmail").type(row["Email"]);
    cy.get("#age").type(row["Age"]);
    cy.get("#salary").type(row["Salary"]);
    cy.get("#department").type(row["Department"]);
    cy.get("#submit").click();
  });
});

Then("todos os registros devem estar visíveis na tabela", () => {
  // Verifica os registros de 1 a 7 na página 1
  for (let i = 1; i <= 7; i++) {
    cy.contains(`Teste${i}`).should("be.visible");
  }
  cy.get(".-next").click();
  cy.wait(1000); 

  // Verifica os registros de 8 a 12 na página 2
  for (let i = 8; i <= 12; i++) {
    cy.contains(`Teste${i}`).should("be.visible");
  }
});

When("excluo todos os novos registros criados", () => {
  //excluir os registros 8 a 12
  cy.get(".-next").click();
  cy.wait(1000);

  for (let i = 15; i >= 11; i--) {
    cy.get(`#delete-record-${i}`).scrollIntoView().click();
    cy.wait(500); 
  }

  // excluir os registros 1 a 7
  cy.get(".-previous").click();
  cy.wait(1000);

  for (let i = 10; i >= 4; i--) {
    cy.get(`#delete-record-${i}`).scrollIntoView().click();
    cy.wait(500);
  }
});

Then("os registros não devem mais estar na tabela", () => {
  for (let i = 1; i <= 12; i++) {
    cy.contains(`Teste${i}`).should("not.exist");
  }
});
