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
  