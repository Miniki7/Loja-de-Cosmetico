from database.db import db

class produto(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'nome': self.nome,
            'descricao': self.descricao,
            'valor': self.valor,
            'quantidade': self.quantidade,
            'tipo': self.tipo,
            'marca': self.marca,
            'categoria': self.categoria,
            'foto': self.foto
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String('50'))
    descricao = db.Column(db.Text)
    valor = db.Column(db.Float)
    quantidade = db.Column(db.Integer)
    tipo = db.Column(db.String('50'))
    marca = db.Column(db.String('50'))
    categoria = db.Column(db.String('50'))
    foto = db.Column(db.Text)


    def __init__(self, nome, descricao, valor, quantidade, tipo, marca, categoria, foto):
        self.nome = nome
        self.descricao = descricao
        self.valor = valor
        self.quantidade = quantidade
        self.tipo = tipo
        self.marca = marca
        self.categoria = categoria
        self.foto = foto