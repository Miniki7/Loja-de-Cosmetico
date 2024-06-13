from routes.usuarioRoutes import usuariosRoutes
from routes.produtoRoutes import produtosRoutes

def default_routes(app):
    app.register_blueprint(usuariosRoutes)
    app.register_blueprint(produtosRoutes)
