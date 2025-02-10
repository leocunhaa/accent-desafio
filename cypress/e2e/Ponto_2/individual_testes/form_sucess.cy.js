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
    cy.get('#uploadPicture').selectFile('cypress/e2e/Ponto 2/testeQA.txt');

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