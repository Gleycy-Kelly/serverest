import 'cypress-file-upload'

class ProdutoFactory {
    cadastrarProduto(produto) {
        const urlCadastroDeProduto = 'https://front.serverest.dev/admin/cadastrarprodutos';
        cy.visit(urlCadastroDeProduto);

        if (produto) {
            if (produto.nome) {
                cy.get('input[data-testid="nome"]').type(produto.nome);
            }
            if (produto.preco) {
                cy.get('input[data-testid="preco"]').type(produto.preco);
            }
            if (produto.descricao) {
                cy.get('textarea[data-testid="descricao"]').type(produto.descricao);
            }
            if (produto.quantidade) {
                cy.get('input[data-testid="quantity"]').type(produto.quantidade);
            }
            if (produto.imagem) {
                cy.get('input[data-testid="imagem"]').attachFile(produto.imagem);
            }
        }

        cy.get('button[data-testid="cadastarProdutos"]').click();
    }

    excluirProduto(nomeDoProduto){
        cy.get('a[data-testid="listarProdutos"]').click()
        cy.get('table.table.table-striped').should('be.visible')

        cy.get('tbody tr').each(($row) => {
            const nomeProdutoNaLinha = $row.find('td').first().text().trim(); 
        
            if (nomeProdutoNaLinha === nomeDoProduto) {
                cy.wrap($row).find('button.btn.btn-danger').contains('Excluir').click();
            }
        });
    }
}

export default ProdutoFactory