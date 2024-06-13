from controllers.fornecedorController import fornecedorController

def fornecedores(app):
    app.route('/fornecedor', methods=['POST', 'GET', 'PUT', 'DELETE'])(fornecedorController)