from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class venda(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'codproduto': self.codproduto,
            'codusuario': self.codusuario,
            'quantidade': self.quantidade,
            'valor': self.valor,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codproduto = db.Column(ForeignKey('produto.codigo'))
    codusuario = db.Column(ForeignKey('usuario.codigo'))
    quantidade = db.Column(db.Integer)
    valor = db.Column(db.Float) 

    produto = relationship('produto', backref='venda')
    usuario = relationship('usuario', backref='venda')

    def __init__(self, codproduto, codusuario, quantidade, valor):
        self.codproduto = codproduto
        self.codusuario = codusuario
        self.quantidade = quantidade
        self.valor = valor