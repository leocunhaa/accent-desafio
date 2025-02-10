const axios = require('axios');

const BASE_URL = "https://demoqa.com";
const USERNAME = "testeQA" + Math.floor(Math.random() * 1000); // Garante um nome único
const PASSWORD = "Teste@123";

let userID = "";
let token = "";
let books = [];

// Função para criar um usuário
async function createUser() {
    try {
        const response = await axios.post(`${BASE_URL}/Account/v1/User`, {
            userName: USERNAME,
            password: PASSWORD
        });
        userID = response.data.userID;
        console.log("✅ Usuário criado:", response.data);
    } catch (error) {
        console.error("❌ Erro ao criar usuário:", error.response.data);
    }
}

// Função para gerar um token
async function generateToken() {
    try {
        const response = await axios.post(`${BASE_URL}/Account/v1/GenerateToken`, {
            userName: USERNAME,
            password: PASSWORD
        });
        token = response.data.token;
        console.log("✅ Token gerado:", token);
    } catch (error) {
        console.error("❌ Erro ao gerar token:", error.response.data);
    }
}

// Função para verificar autorização do usuário
async function checkAuthorization() {
    try {
        const response = await axios.post(`${BASE_URL}/Account/v1/Authorized`, {
            userName: USERNAME,
            password: PASSWORD
        });
        console.log("✅ Usuário autorizado:", response.data);
    } catch (error) {
        console.error("❌ Erro ao verificar autorização:", error.response.data);
    }
}

// Função para listar livros disponíveis
async function listBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/BookStore/v1/Books`);
        books = response.data.books;
        console.log("📚 Livros disponíveis:", books);
    } catch (error) {
        console.error("❌ Erro ao listar livros:", error.response.data);
    }
}

// Função para reservar dois livros
async function reserveBooks() {
    if (books.length < 2) {
        console.error("❌ Não há livros suficientes para reservar.");
        return;
    }

    try {
        const response = await axios.post(`${BASE_URL}/BookStore/v1/Books`, {
            userId: userID,
            collectionOfIsbns: [
                { "isbn": books[0].isbn },
                { "isbn": books[1].isbn }
            ]
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("✅ Livros reservados:", response.data);
    } catch (error) {
        console.error("❌ Erro ao reservar livros:", error.response.data);
    }
}

// Função para obter detalhes do usuário
async function getUserDetails() {
    try {
        const response = await axios.get(`${BASE_URL}/Account/v1/User/${userID}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("👤 Detalhes do usuário:", response.data);
    } catch (error) {
        console.error("❌ Erro ao obter detalhes do usuário:", error.response.data);
    }
}

// Fluxo completo da execução
async function main() {
    await createUser();
    await generateToken();
    await checkAuthorization();
    await listBooks();
    await reserveBooks();
    await getUserDetails();
}

main();
