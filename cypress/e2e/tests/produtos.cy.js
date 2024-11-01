import ProdutoFactory from "../factory/ProdutosFactory"
import LoginFactory from "../factory/LoginFactory"

describe('Manutenção de Produtos', () => {
    const loginFactory = new LoginFactory()
    const produtoFactory = new ProdutoFactory()

    beforeEach(() =>{
        cy.fixture('e2e/login').then((login) =>{
            loginFactory.realizarLogin(login)
        })
    })

    it('Cadastro de Produto Válido', () => {
        const urlListagemDeProdutos = 'https://front.serverest.dev/admin/listarprodutos'
        cy.fixture('e2e/produtos').then((produto) =>{
            produtoFactory.cadastrarProduto(produto.produtoCompleto)
            cy.url().should('contains', urlListagemDeProdutos)
            cy.get('table.table.table-striped').should('be.visible')
            cy.get('tbody tr').should('contain.text', produto.produtoCompleto.nome);
        })  
    })

    it('Cadastro de Produto Inválido', () =>{
        const quantidadeDeAlertas = 4
        const mensagensDeAlerta = ['Nome é obrigatório', 'Preco é obrigatório', 'Descricao é obrigatório', 'Quantidade é obrigatório']
        
        cy.fixture('e2e/produtos').then((produto) =>{
            produtoFactory.cadastrarProduto(produto.produtoVazio)
            cy.get('div.alert.alert-secondary.alert-dismissible').should('have.length', quantidadeDeAlertas)
        })
        
        mensagensDeAlerta.forEach((mensagem) =>{
            cy.get('div.alert.alert-secondary.alert-dismissible').should('contain.text', mensagem)
        })
    })

    it('Exclusão de produto', () =>{
        cy.fixture('e2e/produtos').then((produto) =>{
            produtoFactory.excluirProduto(produto.produtoCompleto.nome)
            cy.get('tbody tr').should('not.contain.text', produto.produtoCompleto.nome);
        })  
    })
})