from database.db import db

class fornecedor(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'nome': self.nome,
            'cnpj': self.cnpj,
            'email': self.email,
            'telefone': self.telefone,
            'endereco': self.endereco,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String('50'))
    cnpj = db.Column(db.Integer)
    email = db.Column(db.String('50'))
    telefone = db.Column(db.Integer)
    endereco = db.Column(db.String('50'))


    def __init__(self, nome, cnpj, email, telefone, endereco):
        self.nome = nome
        self.cnpj = cnpj
        self.email = email
        self.telefone = telefone
        self.endereco = endereco



