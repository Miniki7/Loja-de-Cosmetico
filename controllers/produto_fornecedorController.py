from flask import request
from database.db import db
from models.produto_fornecedor import produto_fornecedor


def produto_fornecedorController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                produto_fornecedores = produto_fornecedor(data['codproduto'], data['codfornecedor'])
                db.session.add(produto_fornecedores)
                db.session.commit()
                return 'produto_fornecedor criado com sucesso', 200 
            
            except Exception as e:
                return 'o produto_fornecedor nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = produto_fornecedor.query.all()
                new = {'fornecedor': [produto_fornecedor.to_dict() for produto_fornecedor in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar produto_fornecedor. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                produto_fornecedores = produto_fornecedor.query.get(codigo)
                if produto_fornecedores:
                    db.session.delete(produto_fornecedores)
                    db.session.commit()
                    return 'produto_fornecedor excluído com sucesso', 200
                else:
                    return 'produto_fornecedor não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir produto_fornecedor. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              produto_fornecedores = produto_fornecedor.query.get(codigo)
              if produto_fornecedores is None:
                   return 'produto_fornecedor não encontrado', 404
              produto_fornecedores.codproduto = data.get('codproduto', produto_fornecedores.codproduto)
              produto_fornecedores.codfornecedor = data.get('codfornecedor', produto_fornecedores.codfornecedor)

              db.session.commit()
              return 'produto_fornecedor atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar produto_fornecedor, {}'.format(str(e)), 405
