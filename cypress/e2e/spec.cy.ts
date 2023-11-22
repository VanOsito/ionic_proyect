describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Verificar mi aplicacion', () => {
  it('verificar login con credenciales incorrectas', () => {
    cy.visit('https://localhost8100').then(() => {
      cy.get('#correo').invoke('val','correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val','1234');
      cy.contains('Ingresa a tu cuenta').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
        cy.get('#saludo').should('contain.text','¡Bienvenido(a) Juan Pérez González!')
      });

    });
  
  });
});