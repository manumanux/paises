// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

describe('Pokedex', () => {
  let fetchPolyfill

  beforeEach(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js'

    cy.request(polyfillUrl).then((response) => {
      fetchPolyfill = response.body
    })

    cy.intercept('GET', 'https://restcountries.com/v3.1/all', {
      fixture: 'example.json',
    }).as('listaPaises')

    cy.visit('http://127.0.0.1:8080', {
      onBeforeLoad(contentWindow) {
        // eslint-disable-next-line no-param-reassign
        delete contentWindow.fetch
        contentWindow.eval(fetchPolyfill)
        // eslint-disable-next-line no-param-reassign
        contentWindow.fetch = contentWindow.unfetch
      },
    })
  })

  it('Hace click a un pais y verifica que se muestre correctamente', () => {
    cy.get('#cantidad-paises').should('have.text', 250)
    cy.get('#indice .list-group-item:first')
      .click()
      .invoke('text')
      .then((innerText) => {
        cy.get('#pais-nombre').should('have.text', innerText)
        cy.get('#caracteristicas-paises .list-group-item:first').contains(
          'Capital:'
        )
      })
  })

  it('Usa el buscador', () => {
    cy.intercept('GET', 'https://restcountries.com/v3.1/name/Argentina', {
      fixture: 'pais-argentina.json',
    }).as('Pais-argentina')
    cy.get('#buscar').click().type('Argentina')
    cy.get('#boton-buscar').click()
    cy.get('#pais-nombre').should('have.text', 'Argentina')
    cy.get('#caracteristicas-paises .list-group-item:first').should(
      'have.text',
      'Capital: Buenos Aires'
    )
  })
})
