from controllers.produtoController import produtoController

def produto(app):
    app.route('/produto', methods=['POST', 'GET', 'PUT', 'DELETE'])(produtoController)
