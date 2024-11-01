class LoginFactory {
    realizarLogin(login){

        cy.visit('https://front.serverest.dev/login')
        cy.get('input[data-testid="email"]').type(login.email)
        cy.get('input[data-testid="senha"]').type(login.senha)
        cy.get('button[data-testid="entrar"]').click()

        cy.url({timeout: 30000}).should('contains', 'https://front.serverest.dev/admin/home')
    }
}

export default LoginFactory