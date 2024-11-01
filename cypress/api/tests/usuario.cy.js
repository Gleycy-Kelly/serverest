describe('Manutenção de usuários', () => {
    const urlBase = 'https://serverest.dev/'
    let idDoUsuario

    it('Cadastro de usuário válido', () => {
        cy.fixture('api/usuarios').then((usuarios) =>{
            cy.request('POST', `${urlBase}/usuarios`, usuarios.usuarioValido).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.message).to.equal('Cadastro realizado com sucesso')
                expect(response.body).to.have.property('_id');
                idDoUsuario = response.body._id;
            })
        })
    })

    it('Cadastro de usuário com email que já está em uso', () => {
        cy.fixture('api/usuarios').then((usuarios) =>{
        cy.request({
            method: 'POST',
            url: `${urlBase}/usuarios`,
            body: usuarios.usuarioInvalido,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.equal('Este email já está sendo usado')
        })
    })
    })

    it('Exclusão de usuário', () => {
        cy.request('DELETE', `${urlBase}/usuarios/${idDoUsuario}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.equal('Registro excluído com sucesso')
        })
    })
})