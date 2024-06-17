from controllers.produto_fornecedorController import produto_fornecedorController

def produto_fornecedor(app):
    app.route('/produto_fornecedor', methods=['POST', 'GET', 'PUT', 'DELETE'])(produto_fornecedorController)