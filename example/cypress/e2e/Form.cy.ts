describe('Form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('succeeds, reset input values and display the global success message', () => {
    cy.get('[data-cy=input-name]').type('John')
    cy.get('[data-cy=input-email]').type('john@john.com')
    cy.get('#error-name').should('not.exist')
    cy.get('#error-email').should('not.exist')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=input-name]').should('have.value', '')
    cy.get('[data-cy=input-email]').should('have.value', '')
    cy.get('#message').should(
      'have.text',
      'Success: The form has been submitted.'
    )
  })

  it('fails with all inputs as required with error messages and update error messages when updating language (translation)', () => {
    const requiredErrorMessage = {
      en: 'Error: Oops, this field is required 🙈.',
      fr: 'Erreur: Oups, ce champ est obligatoire 🙈.'
    }
    cy.get('#error-name').should('not.exist')
    cy.get('#error-email').should('not.exist')
    cy.get('[data-cy=submit]').click()
    cy.get('#error-name').should('have.text', requiredErrorMessage.en)
    cy.get('#error-email').should('have.text', requiredErrorMessage.en)
    cy.get('[data-cy=language-click]').click()
    cy.get('[data-cy=languages-list] > li:first-child').contains('FR').click()
    cy.get('#error-name').should('have.text', requiredErrorMessage.fr)
    cy.get('#error-email').should('have.text', requiredErrorMessage.fr)
  })

  it('fails with invalid name (less than 3 characters)', () => {
    cy.get('[data-cy=input-name]').type('a')
    cy.get('[data-cy=submit]').click()
    cy.get('#error-name').should(
      'have.text',
      'Error: The field must contain at least 3 characters.'
    )
  })

  it('fails with invalid name (more than 10 characters)', () => {
    cy.get('[data-cy=input-name]').type('12345678910aaaa')
    cy.get('[data-cy=submit]').click()
    cy.get('#error-name').should(
      'have.text',
      'Error: The field must contain at most 10 characters.'
    )
  })

  it('fails with wrong email format', () => {
    cy.get('#error-email').should('not.exist')
    cy.get('[data-cy=input-email]').type('test')
    cy.get('[data-cy=submit]').click()
    cy.get('#error-email').should(
      'have.text',
      'Error: Mmm… It seems that this email is not valid 🤔.'
    )
  })
})

export {}
