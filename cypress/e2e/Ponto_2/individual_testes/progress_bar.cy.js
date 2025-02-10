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