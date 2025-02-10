describe('3 - Testando Web Tables', () => {
    beforeEach(() => {
        cy.visit('https://demoqa.com/');
    });
  
    it('Deve criar, editar e excluir um registro na Web Table', () => {
        cy.contains('Elements').click();
        cy.contains('Web Tables').click();
        cy.get('#addNewRecordButton').click();
  
        // Preencher o formulário
        cy.get('#firstName').type('Teste');
        cy.get('#lastName').type('Automação');
        cy.get('#userEmail').type('teste@automacao.com');
        cy.get('#age').type('30');
        cy.get('#salary').type('5000');
        cy.get('#department').type('QA');
  
        cy.get('#submit').click();
        cy.contains('Teste').should('be.visible');
  
        // Clicar no botão de editar
        cy.contains('Teste').parent().find('.mr-2').click();
  
        cy.get('#department').clear().type('DevOps');
        cy.get('#submit').click();
        cy.contains('DevOps').should('be.visible');
        cy.contains('Teste').parent().find('.action-buttons').find('span').last().click();
        cy.contains('Teste').should('not.exist');
    });
  });