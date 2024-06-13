from flask import request, render_template
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
                codigo = request.json['codigo']
                data = produto.query.get(codigo)
                if not data:
                    return "Produto não encontrado", 404
                
                nome = request.json.get('nome', produto.nome)
                descricao = request.json.get('descricao', produto.descricao)
                valor = request.json.get('valor', produto.valor)
                quantidade = request.json.get('quantidade', produto.quantidade)
                tipo = request.json.get('tipo', produto.tipo)
                marca = request.json.get('marca', produto.marca)    
                categoria = request.json.get('categoria', produto.categoria)
                foto = request.json.get('foto', produto.foto)


                produto.nome = nome
                produto.descricao = descricao
                produto.valor = valor  
                produto.quantidade = quantidade
                produto.tipo = tipo
                produto.marca = marca
                produto.categoria = categoria
                produto.foto = foto


                db.session.commit()
                data = produto.query.all()
                return render_template('home.html', data={'produto': [produto.to_dict() for produto in data]})

            
            except Exception as e:
                return 'nao foi possivel alterar produto, {}'.format(str(e)), 405

