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
    cy.wait(1500);
    cy.visit('localhost:8100').then(() => {
      cy.wait(1500);
      //cy.get('#correo').invoke('val','atorres@duocuc.cl');
      cy.get('#correo').type('atorres@duocuc.cl'), {delay: 100}
      cy.wait(1500);
      //cy.get('#password').invoke('val','1234');
      cy.get('#password').type('1234'),{delay: 100}
      cy.wait(1500);
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.wait(1500);
        //cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOCUC');
        cy.get('#saludo').should('contain.text','¡Bienvenido(a) Ana Torres!')
        cy.wait(1500);
        cy.contains('Cerrar sesión').click();
      });
    });
  });


  it('verificar agregar publicacion', () => {
    cy.wait(1500);
    cy.visit('localhost:8100').then(() => {
      cy.wait(1500);
      cy.get('#correo').type('atorres@duocuc.cl'), {delay: 100}
      cy.wait(1500);
      cy.get('#password').type('1234'),{delay: 100}
      cy.wait(1500);
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.wait(1500);
        cy.get('#Foro').click();
        cy.wait(1500);
        cy.get('#titulo').type('Título Prueba'),{delay: 100}
        cy.wait(1500);
        cy.get('#contenido').type('Contenido Prueba'),{delay: 100}
        cy.wait(1500);
        // falta completar el guardar datos
        cy.contains('Cerrar sesión').click();
      });
    });
  });


// agregar "borrar la publicacion"

// agregar "validacion de datos de mis datos"

it('verificar actualizar "mis datos"', () => {
  cy.wait(1500);
  cy.visit('localhost:8100').then(() => {
    cy.wait(1500);
    cy.get('#correo').type('atorres@duocuc.cl'), {delay: 100}
    cy.wait(1500);
    cy.get('#password').type('1234'),{delay: 100}
    cy.wait(1500);
    cy.contains('Ingresar').click();
    cy.intercept('/inicio').as('route').then(() => {
      cy.wait(1500);
      cy.get('#misdatos').click();
      cy.wait(1500);
      cy.get('#nombre').invoke('val','Paula'),{delay: 100}
      cy.wait(1500);
      cy.get('#apellido').invoke('val','López'),{delay: 100}
      cy.wait(1500);
      cy.get('#correo2').invoke('val','plopez@duocuc.cl'),{delay: 100}
      cy.wait(1500);
      cy.get('#preguntasecreta').invoke('val','nombre de mi mamá'),{delay: 100}
      cy.wait(1500);
      cy.get('#respuestasecreta').invoke('val','Sandra'),{delay: 100}
      cy.wait(1500);
      cy.get('#contraseña').invoke('val','4321'),{delay: 100}
      cy.wait(1500);
      cy.get('#repetircontraseña').invoke('val','4321'),{delay: 100}
      cy.wait(1500);
      cy.contains('Actualizar mis datos')
      cy.wait(1500);
      cy.get('#qr').click();
      cy.wait(1500);
      cy.get('#saludo').should('contain.text','¡Bienvenido(a) Paula López!')
      cy.contains('Cerrar sesión').click();
    });
  });
});





});


