from flask import request
from database.db import db
from models.fornecedor import fornecedor


def fornecedorController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                fornecedores = fornecedor(data['nome'], data['cnpj'], data['email'], data['telefone'], data['endereco'])
                db.session.add(fornecedores)
                db.session.commit()
                return 'Fornecedor criado com sucesso', 200 
            
            except Exception as e:
                return 'o fornecedor nao foi criado, {}'.format(e), 405


        elif request.method == 'GET':
            try:
                data = fornecedor.query.all()
                new = {'fornecedor': [fornecedor.to_dict() for fornecedor in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar fornecedor. {}'.format(str(e)), 404


        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                fornecedores = fornecedor.query.get(codigo)
                if fornecedores:
                    db.session.delete(fornecedores)
                    db.session.commit()
                    return 'fornecedor excluído com sucesso', 200
                else:
                    return 'fornecedor não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir fornecedor. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              fornecedores = fornecedor.query.get(codigo)
              if fornecedores is None:
                   return 'fornecedor não encontrado', 404
              fornecedores.nome = data.get('nome', fornecedores.nome)
              fornecedores.cnpj = data.get('cnpj', fornecedores.cnpj)
              fornecedores.email = data.get('email', fornecedores.email)
              fornecedores.telefone = data.get('telefone', fornecedores.telefone)
              fornecedores.endereco = data.get('endereco', fornecedores.endereco)

              db.session.commit()
              return 'fornecedor atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar fornecedor, {}'.format(str(e)), 405
