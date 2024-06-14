from routes.usuarioRoutes import usuario
from routes.produtoRoutes import produto
from routes.fornecedorRoutes import fornecedores


def default_routes(app):
    usuario(app)
    produto(app)
    fornecedores(app)
