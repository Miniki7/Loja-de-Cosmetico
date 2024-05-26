from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, validate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:''@localhost/cosmetico"
app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = False

db = SQLAlchemy(app)

class Usuario(db.Model):
    codigo = db.Column(primary_key=True)
    nome = db.Column(db.String(50))
    email = db.Column(db.String(50))
    senha = db.Column(db.String(50))
    role = db.Column(db.String(50))

    def __init__(self, codigo, nome, email, senha, role):
        self.codigo = codigo
        self.nome = nome
        self.email = email
        self.senha = senha
        self.role = role 

class UsuarioSchema(Schema):
    codigo = fields.Int(required=True)
    nome = fields.Str(required=True)
    email = fields.Email(required=True)
    senha = fields.Str(required=True)
    role = fields.Str(required=True, validate=validate.OneOf(["admin", "user"]))
    

usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)


@app.route('/get', methods = ['GET'])
def get_usuario():
    all_usuario = Usuario.query.all()
    results = usuarios_schema.dump(all_usuario)
    return jsonify(results) 

if __name__ == "__main__":
    app.run(debug=True)
 

@app.route('/post', methods=['POST'])
def add_usuario():
    try:
        codigo = request.json['codigo']
        nome = request.json['nome']
        email = request.json['email']
        senha = request.json['senha']
        role = request.json['role']

        usuario = UsuarioSchema(codigo=codigo, nome=nome, email=email, senha=senha, role=role)
        db.session.add(usuario)
        db.session.commit()
        return usuario_schema.jsonify(usuario), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400



