describe('Header', () => {
  beforeEach(() => cy.visit('/'))

  describe('Switch theme color (dark/light)', () => {
    it('should switch theme from `dark` (default) to `light`', () => {
      cy.get('[data-cy=switch-theme-dark]').should('be.visible')
      cy.get('[data-cy=switch-theme-light]').should('not.be.visible')
      cy.get('body').should(
        'not.have.css',
        'background-color',
        'rgb(255, 255, 255)'
      )

      cy.get('[data-cy=switch-theme-click]').click()

      cy.get('[data-cy=switch-theme-dark]').should('not.be.visible')
      cy.get('[data-cy=switch-theme-light]').should('be.visible')
      cy.get('body').should(
        'have.css',
        'background-color',
        'rgb(255, 255, 255)'
      )
    })
  })

  describe('Switch Language', () => {
    it('should switch language from EN (default) to FR', () => {
      cy.get('[data-cy=main-description]').contains('This is an example')
      cy.get('[data-cy=language-flag-text]').contains('EN')
      cy.get('[data-cy=languages-list]').should('not.be.visible')
      cy.get('[data-cy=language-click]').click()
      cy.get('[data-cy=languages-list]').should('be.visible')
      cy.get('[data-cy=languages-list] > li:first-child').contains('FR').click()
      cy.get('[data-cy=languages-list]').should('not.be.visible')
      cy.get('[data-cy=language-flag-text]').contains('FR')
      cy.get('[data-cy=main-description]').contains('Ceci est un exemple')
    })

    it('should close the language list menu when clicking outside', () => {
      cy.get('[data-cy=languages-list]').should('not.be.visible')
      cy.get('[data-cy=language-click]').click()
      cy.get('[data-cy=languages-list]').should('be.visible')
      cy.get('[data-cy=main-description]').click()
      cy.get('[data-cy=languages-list]').should('not.be.visible')
    })
  })
})

export {}
