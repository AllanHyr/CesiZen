describe('Connexion utilisateur', () => {
  it('permet à un utilisateur de se connecter', () => {
    cy.visit('http://localhost:9000/')

    cy.get('button[aria-label="Menu"]').click()
    cy.contains('Se connecter').click()

    cy.url().should('include', '/login')

    cy.contains('Pas de compte ? Créer un compte').click()

    // Remplissage du formulaire
    cy.get('[data-cy=login-email]').should('be.visible').click().type('register@cesizen.fr')
    cy.get('[data-cy=login-password]').should('be.visible').click().type('register123')

    // Soumission
    cy.get('[data-cy=login-validation]').click()
    cy.get('[data-cy=login-validation]').click()

    // Vérifications
    cy.url().should('include', '/dashboard')
    cy.contains('Connecté : register@cesizen.fr') // ou un message de dashboard
  })
})
