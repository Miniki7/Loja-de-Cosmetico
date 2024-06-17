from controllers.vendaController import vendaController

def venda(app):
    app.route('/venda', methods=['POST', 'GET', 'PUT', 'DELETE'])(vendaController)

