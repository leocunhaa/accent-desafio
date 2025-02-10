import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
    // Retorna false para evitar que Cypress falhe com esse erro
    return false;
});