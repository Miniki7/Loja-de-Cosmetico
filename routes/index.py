from routes.usuarioRoutes import usuario
from routes.produtoRoutes import produto
from routes.fornecedorRoutes import fornecedores
from routes.vendaRoutes import venda
from routes.produto_fornecedor import produto_fornecedor


def default_routes(app):
    usuario(app)
    produto(app)
    fornecedores(app)
    venda(app)
    produto_fornecedor(app)

