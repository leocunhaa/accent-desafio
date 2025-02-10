/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('1 - Preenchendo o formulário de Forms', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/'); 
  });

  it('Deve preencher e enviar o formulário com sucesso', () => {
    cy.contains('Forms').click();
    cy.url().should('eq', 'https://demoqa.com/forms');
    cy.contains('Practice Form').click();
    cy.url().should('eq', 'https://demoqa.com/automation-practice-form');

    // Gerar dados aleatórios e preencher formulário
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const mobile = faker.string.numeric(10); 

    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('input[name="gender"][value="Male"]').check({ force: true }); 
    cy.get('#userNumber').type(mobile);

    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select('1995');
    cy.get('.react-datepicker__month-select').select('March');
    cy.get('.react-datepicker__day--015').click(); // Seleciona dia 15

    cy.get('#subjectsInput').type('Math');
    cy.get('.subjects-auto-complete__menu').contains('Maths').click(); 
    cy.get('input#hobbies-checkbox-1').check({ force: true });

    // Fazendo upload do arquivo testeQA.txt
    cy.get('#uploadPicture').selectFile('cypress/e2e/Ponto_2/testeQA.txt');

    cy.get('#currentAddress').type(faker.location.streetAddress());
    const estados = ['NCR', 'Uttar Pradesh', 'Haryana', 'Rajasthan'];
    const estadoAleatorio = faker.helpers.arrayElement(estados);
    cy.get('#state').click();
    cy.contains(estadoAleatorio).click();

    cy.get('#city').click();
    cy.get('#city div').first().click(); 

    cy.get('#submit').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('#closeLargeModal').click({ force: true });
  });
});

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

describe('4 - Testando Progress Bar', () => {
    it('Deve controlar a Progress Bar corretamente', () => {
        cy.visit('https://demoqa.com/');
        cy.contains('Widgets').click();
        cy.contains('Progress Bar').click();
        cy.get('#startStopButton').click();

        // Aguardar até que a Progress Bar atinja 20% (para garantir que não passe de 25%)
        function esperarAte20() {
            cy.get('#progressBar').invoke('text').then((text) => {
                let progressValue = parseInt(text.replace('%', ''), 10);
                if (progressValue < 20) {
                    cy.wait(100); // Pequeno delay para evitar ultrapassar o valor
                    esperarAte20(); 
                } else {
                    cy.get('#startStopButton').click(); // Pausa ao atingir 20%
                }
            });
        }

        cy.wait(2000);
        esperarAte20(); // Inicia novamente

        // Valida que o valor da Progress Bar é menor ou igual a 25%
        cy.get('#progressBar').invoke('text').then((text) => {
            const progressValue = parseInt(text.replace('%', ''), 10);
            expect(progressValue).to.be.at.most(25);
        });

        // Apertar Start novamente para continuar até 100%
        cy.get('#startStopButton').click();

        // Aguardar até que chegue a 100%
        function esperarAte100() {
            cy.get('#progressBar').invoke('text').then((text) => {
                let progressValue = parseInt(text.replace('%', ''), 10);
                if (progressValue < 100) {
                    cy.wait(100);
                    esperarAte100();
                }
            });
        }
        esperarAte100();

        // Validar que chegou em 100%
        cy.get('#progressBar').should('have.text', '100%');
        cy.get('#resetButton').click(); // Resetar
        cy.get('#progressBar').should('have.text', '0%');
    });
});

describe('5 - Testando Sortable (Drag and Drop)', () => {
  it('Deve ordenar os itens corretamente', () => {
      cy.visit('https://demoqa.com/');
      cy.contains('Interactions').click();
      cy.contains('Sortable').click();
      cy.contains('List').click();

      // Função de arrastar um item para a posição de outro
      function dragAndDrop(sourceText, targetIndex) {
          cy.contains('.list-group-item', sourceText)
              .trigger('mousedown', { which: 1, force: true });

          cy.get('.list-group-item')
              .eq(targetIndex)
              .trigger('mousemove', { force: true })
              .trigger('mouseup', { force: true });
      }

      // Mover "Six" para o índice 0
      dragAndDrop('Six', 0);
      dragAndDrop('Five', 1); // índice 1
      dragAndDrop('Four', 2); // índice 2
      dragAndDrop('Three', 3); // índice 3
      dragAndDrop('Two', 4); //índice 4
      dragAndDrop('One', 5); // índice 5
      });
});
