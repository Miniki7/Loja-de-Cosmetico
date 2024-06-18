from flask import request
from database.db import db
from models.usuario import usuario, login

def usuarioController():

        if request.method == 'POST':
            try: 
                data = request.get_json()
                print(data)
                user = usuario(data['nome'], data['email'], data['senha'], data['role'])
                db.session.add(user)
                db.session.commit()
                return 'usuario criado com sucesso', 200
            
            except Exception as e:
                return 'o usuario nao foi criado, {}'.format(e), 405

        elif request.method == 'GET':
            try:
                data = usuario.query.all()
                new = {'usuario': [usuario.to_dict() for usuario in data]}
                return new, 200

            except Exception as e:
                return 'nao foi possivel buscar usuarios. {}'.format(str(e)), 404
        

        elif request.method == 'DELETE':
            try:
                data = request.get_json()
                codigo = data['codigo']
                usuarios = usuario.query.get(codigo)
                if usuarios:
                    db.session.delete(usuarios)
                    db.session.commit()
                    return 'usuário excluído com sucesso', 200
                else:
                    return 'usuário não encontrado', 404
            except Exception as e:
                return 'Erro ao excluir usuário. Erro {}'.format(str(e)), 400


        elif request.method == 'PUT':
            try:
              data = request.get_json()
              codigo = data['codigo']
              user = usuario.query.get(codigo)
              if user is None:
                   return 'usuário não encontrado', 404
              user.nome = data.get('nome', user.nome)
              user.email = data.get('email', user.email)
              user.senha = data.get('senha', user.senha)
              user.role = data.get('role', user.role)

              db.session.commit()
              return 'usuário atualizado com sucesso', 200 
            
            except Exception as e:
                return 'nao foi possivel alterar usuario, {}'.format(str(e)), 405
