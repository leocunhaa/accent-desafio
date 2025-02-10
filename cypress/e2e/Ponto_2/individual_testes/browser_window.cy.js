describe('2 - Testando Browser Windows', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/'); 
  });

  it('Deve abrir uma nova janela, validar o texto e voltar', () => {

    cy.contains('Alerts, Frame & Windows').click();
    cy.url().should('eq', 'https://demoqa.com/alertsWindows');
    cy.contains('Browser Windows').click();
    cy.url().should('eq', 'https://demoqa.com/browser-windows');

    // Capturar a URL da nova aba antes de clicar no botão
    cy.get('#windowButton').invoke('attr', 'onclick').then((onclick) => {
      // A URL da nova aba está dentro da função JavaScript que o botão chama
      const novaAbaUrl = 'https://demoqa.com/sample';
      cy.visit(novaAbaUrl);

      // Validar que o texto "This is a sample page" aparece na nova aba
      cy.contains('This is a sample page').should('be.visible');
      cy.go('back');
      cy.url().should('eq', 'https://demoqa.com/browser-windows'); // Garantir que voltamos para a página normal
    });
  });
});
