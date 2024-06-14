import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Tables.css';

const Table_Usuarios = () => {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentProdutos, setCurrentProdutos] = useState({ codigo: '', nome: '', email: '', senha: '', role: ''});
  const [searchTerm, setSearchTerm] = useState('');
	

  useEffect(() => {
    // Fetch products from server
    fetchProdutos();
  }, []);

  useEffect(() => {
    // Filter produtos based on searchTerm
    setFilteredProdutos(
      produtos.filter((prod) =>
        prod.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, produtos]);

  const fetchProdutos = async () => {
    // Simulate a server fetch
    const data = [
      { codigo: 1, nome: 'Fiction' },
      { codigo: 2, nome: 'Non-fiction' },
      { codigo: 3, nome: 'Science' },
    ];
    setProdutos(data);
    setFilteredProdutos(data);
  };

  const showModalHandler = (type, produto) => {
    setModalType(type);
    setCurrentProdutos(produto || {codigo: '', nome: '', email: '', senha: '', role: '' });
    setShowModal(true);
  };
	
  const handleCloseModal = () => setShowModal(false);

  // handleChange é um manipulador de eventos comum usado para atualizar os detalhes do produto conforme o usuário insere informações em algum campo de entrada 
  const handleChange = (e) => {
    // Extrai o 'name' e 'value' do elemento que acionou o evento (input, select, etc.)
    const { name, value, } = e.target;
     // Atualiza os detalhes do produto com o novo valor usando o spread operator
      // e mantém os valores anteriores usando uma função de atualização no setState
    setCurrentProdutos((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();// Evita que o formulário recarregue a página ao ser enviado
     // Verifica o tipo de modal (Adição ou Edição) para decidir o que fazer
    if (modalType === 'Add') {
      setProdutos([...produtos, { ...currentProdutos, codigo: produtos.length + 1 }]);
    } else if (modalType === 'Edit') {
      setProdutos(produtos.map((prod) => (prod.codigo === currentProdutos.codigo ? currentProdutos : prod)));
    }
    handleCloseModal();
  };

  const handleDelete = (codigo) => {
    setProdutos(produtos.filter((prod) => prod.codigo !== codigo));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="margim">
        <h2>Lista de Produtos:</h2>
        <Form className="mb-3 d-flex">
          <Form.Control
            type="text"
            placeholder="Nome ..."
            className="mr-2"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button variant="primary" onClick={() => showModalHandler('Add')}>Cadastrar</Button>
        </Form>
        <table className="table table-striped w-100">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredProdutos.map((prod) => (
              <tr key={prod.codigo}>
                <td>{prod.codigo}</td>
                <td>{prod.nome}</td>
                <td>{prod.email}</td>
                <td>{prod.senha}</td>
                <td>{prod.role}</td>
                <td>{prod.tipo}</td>
                <td>{prod.marca}</td>
                <td>{prod.categoria}</td>
                <td>{prod.foto}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(prod.codigo)}>Excluir</Button>
                  <Button variant="primary" onClick={() => showModalHandler('Edit', prod)}>Alterar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'Add' ? 'Adicionar Produto' : 'Editar Produto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCodigo">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="number"
                name="codigo"
                value={currentProdutos.codigo}
                onChange={handleChange}
                readOnly={modalType === 'Edit'}
              />
            </Form.Group>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={currentProdutos.nome}
                onChange={handleChange}
              />
               </Form.Group>
               <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentProdutos.email}
                onChange={handleChange}
              />
               </Form.Group>
            <Form.Group controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="text"
                name="senha"
                value={currentProdutos.senha}
                onChange={handleChange}
              />
               </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={currentProdutos.role}
                onChange={handleChange}
              />
               </Form.Group>
            <Button variant="primary" type="submit">
              {modalType === 'Add' ? 'Adicionar' : 'Salvar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Table_Usuarios;