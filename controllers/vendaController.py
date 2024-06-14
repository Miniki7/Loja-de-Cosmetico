from flask import request
from database.db import db
from models.venda import venda

def vendaController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            vendas = venda(data['codproduto'], data['codusuario'], data['quantidade'], data['valor'])
            print(vendas)
            db.session.add(vendas)
            db.session.commit()
            return 'venda criada com sucesso', 200
        except Exception as e:
            return e, 405
        
    elif request.method == 'GET':
        try:
            data = venda.query.all()
            new = {'venda': [venda.to_dict() for venda in data]}
            return new, 200
        except Exception as e:
            return 'Não foi possível buscar vendas', 405
        
    elif request.method == 'PUT':
         try:
              data = request.get_json()
              codigo = data['codigo']
              vendas = venda.query.get(codigo)
              if vendas is None:
                   return 'vendas não encontrada', 404
              vendas.codproduto = data.get('codproduto', vendas.codproduto)
              vendas.codusuario = data.get('codusuario', vendas.codusuario)
              vendas.quantidade = data.get('quantidade', vendas.quantidade)
              vendas.valor = data.get('valor', vendas.valor)
              db.session.commit()
              return 'venda atualizada com sucesso', 200
         except Exception as e:
                return 'Erro ao atualizar vendas. Erro {}'.format(str(e)), 400
         
    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            codigo = data['codigo']
            vendas = venda.query.get(codigo)
            if vendas:
                db.session.delete(vendas)
                db.session.commit()
                return 'venda excluída com sucesso', 200
            else:
                return {'error': 'consulta não encontrada'}, 404
        except Exception as e:
                return 'Erro ao excluir vendas. Erro {}'.format(str(e)), 400
