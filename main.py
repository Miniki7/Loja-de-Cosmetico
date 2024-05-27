from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
ma = Marshmallow(app)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Definir os modelos
class Usuario(db.Model):
    __tablename__ = 'usuario'
    codigo = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(10), nullable=False)

    def __init__(self, codigo, nome, email, senha, role):
        self.codigo = codigo
        self.nome = nome
        self.email = email
        self.senha = senha
        self.role = role


class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('codigo', 'nome', 'email', 'senha', 'role')


class Produto(db.Model):
    __tablename__ = 'produto'
    codigo = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    valor = db.Column(db.Float, nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    tipo = db.Column(db.String(50), nullable=False)
    marca = db.Column(db.String(50), nullable=False)
    categoria = db.Column(db.String(50), nullable=False)
    foto = db.Column(db.String(200), nullable=True)

    def __init__(self, codigo, nome, descricao, valor, quantidade, tipo, marca, categoria, foto):
        self.codigo = codigo
        self.nome = nome
        self.descricao = descricao
        self.valor = valor
        self.quantidade = quantidade
        self.tipo = tipo
        self.marca = marca
        self.categoria = categoria
        self.foto = foto

class Fornecedor(db.Model):
    __tablename__ = 'fornecedor'
    codigo = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    cnpj = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    endereco = db.Column(db.String(200), nullable=False)

    def __init__(self, codigo, nome, cnpj, email, telefone, endereco):
        self.codigo = codigo
        self.nome = nome
        self.cnpj = cnpj
        self.email = email
        self.telefone = telefone
        self.endereco = endereco

class ProdutoFornecido(db.Model):
    __tablename__ = 'produto_fornecido'
    codigo = db.Column(db.Integer, primary_key=True)
    codproduto = db.Column(db.Integer, db.ForeignKey('produto.codigo'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)

    def __init__(self, codigo, codproduto, quantidade):
        self.codigo = codigo
        self.codproduto = codproduto 
        self.quantidade = quantidade


class ProdutoFornecedor(db.Model):
    __tablename__ = 'produto_fornecedor'
    codigo = db.Column(db.Integer, primary_key=True)
    codproduto = db.Column(db.Integer, db.ForeignKey('produto.codigo'), nullable=False)
    codfornecedor = db.Column(db.Integer, db.ForeignKey('fornecedor.codigo'), nullable=False)

    def __init__(self, codigo, codproduto, codfornecedor):
        self.codigo = codigo
        self.codproduto = codproduto 
        self.codfornecedor = codfornecedor

class Venda(db.Model):
    __tablename__ = 'venda'
    codigo = db.Column(db.Integer, primary_key=True)
    codproduto = db.Column(db.Integer, db.ForeignKey('produto.codigo'), nullable=False)
    codusuario = db.Column(db.Integer, db.ForeignKey('usuario.codigo'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    valor = db.Column(db.Float, nullable=False)

    def __init__(self, codigo, codproduto, codusuario, quantidade, valor):
        self.codigo = codigo
        self.codproduto = codproduto 
        self.codusuario = codusuario
        self.quantidade = quantidade
        self.valor = valor


####################################


usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)


@app.route('/get', methods = ['GET'])
def get_usuario():
    return jsonify({"hello world"})


@app.route('/post', methods = ['POST'])
def add_usuario():
    codigo = request.json['codigo']
    nome = request.json['nome']
    email = request.json['email']
    senha = request.json['senha']
    role = request.json['role']

    usuario = Usuario(codigo, nome, email, senha, role)
    db.session.ad(usuario)
    db.session.commit()
    return usuario_schema.jsonify(usuario)


@app.route('/')
def home():
    return 'Hello, Flask!'

if __name__ == '__main__':
    app.run(debug=True)


def create_database():
    with app.app_context():
        db.create_all()
        print("Database created successfully!")