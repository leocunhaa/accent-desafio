# Desafio de Automação 🚀

Este repositório contém a automação completa do desafio técnico utilizando **Cypress** para testes E2E e API, além de **Cucumber BDD** para um dos testes como bônus. Todos os testes foram organizados em pastas específicas para facilitar a navegação e compreensão da estrutura do projeto.

## 📌 Tecnologias Utilizadas

- **Cypress** - Framework principal para automação de testes.
- **Faker.js** - Utilizado para gerar dados fictícios (nomes, emails, etc.).
- **Axios** - Para chamadas HTTP nos testes de API.
- **Cucumber BDD** - Implementado no teste da Web Tables.
- **Node.js** - Ambiente de execução dos testes.

## 📂 Estrutura do Projeto

```
cypress/
 ├── e2e/
 │   ├── Ponto_1/                # Testes de API
 │   │   ├── api_automacao.cy.js  # Teste automatizado de API
 │   │   ├── apiTest.js           # Teste para rodar no terminal
 │   ├── Ponto_2/                # Testes E2E
 │   │   ├── individual_testes/   # Testes separados
 │   │   │   ├── browser_window.cy.js
 │   │   │   ├── drag_and_drop.cy.js
 │   │   │   ├── form_sucess.cy.js
 │   │   │   ├── progress_bar.cy.js
 │   │   │   ├── web_tables.cy.js
 │   │   ├── complet_auto_demoQA.cy.js # Arquivo com todos os testes juntos
 │   ├── web_tables/             # Teste bônus com Cucumber
 │   │   ├── web_tables.steps.js  # Implementação dos passos BDD
 │   │   ├── web_tables.feature   # Arquivo feature do Cucumber
 ├── support/
 │   ├── commands.js
 │   ├── e2e.js
 ├── cypress.config.js           # Configuração do Cypress
 ├── package.json                # Dependências do projeto
```

## 🔎 Descrição dos Testes

### 📌 Ponto 1 - Testes de API

📍 Localização: `cypress/e2e/Ponto_1/`
- **`api_automacao.cy.js`**: Teste automatizado utilizando Cypress.
- **`apiTest.js`**: Teste para rodar diretamente no terminal via Node.js.
  - Ambos testam a mesma funcionalidade, mas o terminal oferece uma melhor visualização.

### 📌 Ponto 2 - Testes de Interface

📍 Localização: `cypress/e2e/Ponto_2/`
- **`complet_auto_demoQA.cy.js`**: Arquivo único contendo todos os testes rodando de uma vez.
- **`individual_testes/`**: Contém os mesmos testes, mas divididos um a um:
  - `browser_window.cy.js` - Teste da manipulação de janelas do navegador.
  - `drag_and_drop.cy.js` - Teste de arrastar e soltar elementos.
  - `form_sucess.cy.js` - Teste de submissão de formulário com sucesso.
  - `progress_bar.cy.js` - Teste de comportamento da barra de progresso.
  - `web_tables.cy.js` - Teste da tabela na aplicação.

### 🎯 Bônus - Teste com Cucumber BDD

📍 Localização: `cypress/e2e/web_tables/`
- **`web_tables.steps.js`**: Implementação dos passos do teste BDD.
- **`web_tables.feature`**: Arquivo Feature descrevendo o comportamento esperado no formato Gherkin.

> Os testes foram organizados em diferentes pastas para facilitar a navegação e permitir que os revisores escolham a abordagem desejada.

## ▶ Como Executar os Testes

1. **Instalar as dependências:**
```sh
npm install cypress axios @faker-js/faker @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor
```

2. **Abrir o cypress**
```sh
npx cypress open
```

## 🎯 Considerações Finais

- O projeto foi 100% automatizado e segue boas práticas de organização.
- A separação entre arquivos completos e individuais foi feita para facilitar a avaliação.
- O teste bônus com **Cucumber BDD** está completo!

🚀 **Agora é só rodar os testes!** 🚀

