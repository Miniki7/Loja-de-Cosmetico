""" 
no terminal:

python
from app import create_database
create_database()
 """

from flask import Flask, jsonify ,request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)



app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Usuario(db.Model):
    __tablename__ = 'usuario'
    codigo = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(10), nullable=False)

    def __init__(self, nome, email, senha, role):
        self.nome = nome
        self.email = email
        self.senha = senha
        self.role = role

class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('codigo', 'nome', 'email', 'senha', 'role')


usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)


@app.route('/')
def home():
    return 'Hello!'


@app.route('/get', methods=['GET'])
def get_usuario():
    usuarios = Usuario.query.all()
    return usuarios_schema.jsonify(usuarios)


@app.route('/post', methods = ['POST'])
def add_usuario():
    nome = request.json['nome']
    email = request.json['email']
    senha = request.json['senha']
    role = request.json['role']

    email_repetido = Usuario.query.filter_by(email=email).first()
    if email_repetido:
        return "Email já foi utilizado em outro cadastro", 400

    usuario = Usuario(nome, email, senha, role)
    db.session.add(usuario)
    db.session.commit()
    return usuario_schema.jsonify(usuario)


@app.route('/delete', methods=['DELETE'])
def delete_usuario():
    codigo = request.json['codigo']
    usuario = Usuario.query.get(codigo)
    if not usuario:
        return "Usuário não encontrado", 404

    db.session.delete(usuario)
    db.session.commit()
    return "Usuário deletado com sucesso", 200


@app.route('/update', methods=['PUT'])
def update_usuario():
    codigo = request.json['codigo']
    usuario = Usuario.query.get(codigo)
    if not usuario:
        return "Usuário não encontrado", 404

    nome = request.json.get('nome', usuario.nome)
    email = request.json.get('email', usuario.email)
    senha = request.json.get('senha', usuario.senha)
    role = request.json.get('role', usuario.role)

    if email != usuario.email:
        email_repetido = Usuario.query.filter_by(email=email).first()
        if email_repetido:
            return "Email já foi utilizado em outro cadastro", 400
        
    usuario.nome = nome
    usuario.email = email
    usuario.senha = senha  
    usuario.role = role

    db.session.commit()
    return usuario_schema.jsonify(usuario)


def create_database():
    with app.app_context():
        db.create_all()
        print("Database created successfully!")


if __name__ == '__main__':
    app.run(debug=True)

