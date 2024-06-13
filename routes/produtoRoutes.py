from flask import Blueprint
from controllers.produtoController import produtoController

produtosRoutes = Blueprint('produtosRoutes', __name__)

@produtosRoutes.route('/produto', methods=['GET', 'POST', 'PUT', 'DELETE'])
def handle_products():
    return produtoController()

@produtosRoutes.route('/produto/<int:product_id>', methods=['GET', 'DELETE','PUT'])
def handle_product_by_id(product_id):
    return produtoController(product_id)
