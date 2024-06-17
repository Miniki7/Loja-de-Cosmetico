from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class produto_fornecedor(db.Model): 
    def to_dict(self):
        return{
            'codigo': self.codigo,
            'codproduto': self.codproduto,
            'codfornecedor': self.codfornecedor,
        }
    
    codigo = db.Column(db.Integer, primary_key=True)
    codproduto = db.Column(ForeignKey('produto.codigo'))
    codfornecedor = db.Column(ForeignKey('fornecedor.codigo'))

    produto = relationship('produto', backref='produto_fornecedor')
    fornecedor = relationship('fornecedor', backref='produto_fornecedor')

    def __init__(self, codproduto, codfornecedor):
        self.codproduto = codproduto
        self.codfornecedor = codfornecedor