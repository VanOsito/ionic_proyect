// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Verificar mi aplicacion', () => {
  it('verificar login con credenciales incorrectas', () => {
    cy.visit('localhost:8100').then(() => {
      cy.get('#correo').invoke('val','correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val','1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        //cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
        cy.get('#saludo').should('contain.text','¡Bienvenido(a) Juan Pérez González!')
      });

    });
  
  });

  it('verificar login con credenciales correctas', () => {
    cy.wait(3000);
    cy.visit('localhost:8100').then(() => {
      cy.wait(3000);
      //cy.get('#correo').invoke('val','atorres@duocuc.cl');
      cy.get('#correo').type('atorres@duocuc.cl'), {delay: 100}
      


      cy.wait(3000);
      //cy.get('#password').invoke('val','1234');
      cy.get('#password').type('1234'),{delay: 100}
      cy.wait(3000);
      
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.wait(3000);
        //cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOCUC');
        cy.get('#saludo').should('contain.text','¡Bienvenido(a) Ana Torres!')
        cy.wait(3000);
        cy.contains('Cerrar sesión').click();
      });

    });
  
  });




});


