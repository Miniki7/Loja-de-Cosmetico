from controllers.usuarioController import usuarioController

def usuario(app):
    app.route('/usuario', methods=['POST', 'GET', 'PUT', 'DELETE'])(usuarioController)

def login(app):
    app.route('/login', methods=['POST', 'GET', 'PUT', 'DELETE'])(usuarioController)
