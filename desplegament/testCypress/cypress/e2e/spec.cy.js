describe('Tercer flux', () => {
  it('Comproba la pàgina', () => {
    cy.visit('http://try-ssh.a22betvilver.daw.inspedralbes.cat/')
    cy.get('h1:contains("Welcome to Vue Actions")')
      .should('exist')
      .should('be.visible')

    for (let i = 1; i <= 9; i++) {
      cy.get(`button:contains("${i}")`).click()
      cy.get(`p:contains("${i}")`)
        .should('exist')
        .should('be.visible')
    }
  })
})