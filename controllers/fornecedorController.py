from flask import request, render_template
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
                return render_template('home.html', data={'fornecedor': [fornecedor.to_dict() for fornecedor in data]})

            except Exception as e:
                return 'nao foi possivel buscar fornecedor. Erro: {}'.format(str(e)), 405
        
        elif request.method == 'DELETE':
            try:
                codigo = request.json['codigo']
                data = fornecedor.query.get(codigo)
                if not data:
                    return "Fornecedor não encontrado", 404

                db.session.delete(data)
                db.session.commit()
                return "Fornecedor deletado com sucesso", 200

            except Exception as e:
                return 'Fornecedor nao foi deletado, {}'.format(str(e)), 405
            
        elif request.method == 'PUT':
            try:
                codigo = request.json['codigo']
                data = fornecedor.query.get(codigo)
                if not data:
                    return "Usuário não encontrado", 404
                
                nome = request.json.get('nome', fornecedor.nome)
                cnpj = request.json.get('cnpj', fornecedor.cnpj)
                email = request.json.get('email', fornecedor.email)
                telefone = request.json.get('telefone', fornecedor.telefone)
                endereco = request.json.get('endereco', fornecedor.endereco)


                if cnpj != fornecedor.cnpj:
                    cnpj_repetido = fornecedor.query.filter_by(cnpj=cnpj).first()
                    if cnpj_repetido:
                        return "Cnpj já foi utilizado em outro cadastro", 400
                    
                fornecedor.nome = nome
                fornecedor.cnpj = cnpj
                fornecedor.email = email  
                fornecedor.telefone = telefone
                fornecedor.endereco = endereco

                db.session.commit()
                data = fornecedor.query.all()
                return render_template('home.html', data={'fornecedor': [fornecedor.to_dict() for fornecedor in data]})

            
            except Exception as e:
                return 'nao foi possivel alterar fornecedor, {}'.format(str(e)), 405

