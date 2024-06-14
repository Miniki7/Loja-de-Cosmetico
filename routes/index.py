from routes.usuarioRoutes import usuario
from routes.produtoRoutes import produto
from routes.fornecedorRoutes import fornecedores
from routes.vendaRoutes import venda


def default_routes(app):
    usuario(app)
    produto(app)
    fornecedores(app)
    venda(app)
