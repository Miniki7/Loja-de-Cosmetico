from flask import Blueprint
from controllers.usuarioController import usuarioController, signUpController

usuariosRoutes = Blueprint('usuariosRoutes', __name__)

@usuariosRoutes.route('/usuario', methods=['GET', 'POST', 'PUT', 'DELETE'])
def handle_users():
    return usuarioController()

@usuariosRoutes.route('/signup', methods=['POST'])
def handle_login():
    return signUpController()
