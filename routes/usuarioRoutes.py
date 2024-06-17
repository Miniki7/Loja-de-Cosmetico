from controllers.usuarioController import usuarioController

def usuario(app):
    app.route('/usuario', methods=['POST', 'GET', 'PUT', 'DELETE'])(usuarioController)

