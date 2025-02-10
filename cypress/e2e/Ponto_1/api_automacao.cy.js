describe('Desafio API - Testes de integração', () => {
    let userID;
    let token;
    let books = []; // Variável global para armazenar os livros

    const userName = `testeQA_${Date.now()}`;
    const password = "Teste@123";

    it('Criar um usuário', () => {
        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/Account/v1/User',
            body: {
                userName: userName,
                password: password
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            userID = response.body.userID; // Armazena o userID na variável global
            cy.log('User ID:', userID);
        });
    });

    it('Gerar Token de acesso', () => {
        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/Account/v1/GenerateToken',
            body: {
                userName: userName,
                password: password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            token = response.body.token; // Armazena o token na variável global
            cy.log('Token:', token);
        });
    });

    it('Listar os livros disponíveis', () => {
        cy.request({
            method: 'GET',
            url: 'https://demoqa.com/BookStore/v1/Books'
        }).then((response) => {
            expect(response.status).to.eq(200);
            books = response.body.books; // Armazena os livros na variável global
            cy.log('Livros disponíveis:', books);
        });
    });

    it('Reservar dois livros', () => {
        const selectedBooks = [
            { "isbn": books[0].isbn },
            { "isbn": books[1].isbn }
        ];

        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/BookStore/v1/Books',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                userId: userID,
                collectionOfIsbns: selectedBooks
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });

    it('Listar detalhes do usuário com os livros alugados', () => {
        cy.request({
            method: 'GET',
            url: `https://demoqa.com/Account/v1/User/${userID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log('Detalhes do Usuário:', response.body);
        });
    });
});
