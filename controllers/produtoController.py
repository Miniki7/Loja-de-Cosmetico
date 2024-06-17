from flask import request
from database.db import db
from models.produto import produto


def produtoController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                produtos = produto(data['nome'], data['descricao'], data['valor'], data['quantidade'], data['tipo'], data['marca'], data['categoria'], data['foto'])
                db.session.add(produtos)
                db.session.commit()
                return 'Produto criado com sucesso', 200 
            
            except Exception as e:
                return 'o produto nao foi criado, {}'.format(e), 405
            
        elif request.method == 'GET':
            try:
                data = produto.query.all()
                new = {'produto': [produto.to_dict() for produto in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar produtos, {}'.format(str(e)), 405
    
        elif request.method == 'DELETE':

            try:
                codigo = request.json['codigo']
                data = produto.query.get(codigo)
                if not data:
                    return "Produto não encontrado", 404

                db.session.delete(data)
                db.session.commit()
                return "Produto deletado com sucesso", 200

            except Exception as e:
                return 'Produto nao foi deletado, {}'.format(str(e)), 405


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              produtos = produto.query.get(codigo)
              if produtos is None:
                   return 'produto não encontrado', 404
              produtos.nome = data.get('nome', produtos.nome)
              produtos.descricao = data.get('descricao', produtos.descricao)
              produtos.valor = data.get('valor', produtos.valor)
              produtos.quantidade = data.get('quantidade', produtos.quantidade)
              produtos.tipo = data.get('tipo', produtos.tipo)
              produtos.marca = data.get('marca', produtos.marca)
              produtos.categoria = data.get('categoria', produtos.categoria)
              produtos.foto = data.get('foto', produtos.foto)

              db.session.commit()
              return 'produto atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar produto, {}'.format(str(e)), 405

