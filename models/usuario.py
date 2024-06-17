from database.db import db

class usuario(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'nome': self.nome,
            'email': self.email,
            'senha': self.senha,
            'role': self.role
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String('50'))
    email = db.Column(db.String('50'))
    senha = db.Column(db.String('50'))
    role = db.Column(db.String('50'))

    def __init__(self, nome, email, senha, role):
        self.nome = nome
        self.email = email
        self.senha = senha
        self.role = role