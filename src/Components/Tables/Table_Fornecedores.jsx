import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Tables.css';

const Table_Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [filteredFornecedores, setFilteredFornecedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('Add');
  const [currentFornecedor, setCurrentFornecedor] = useState({ codigo: '', nome: '', cnpj: '', email: '', telefone: '', endereco: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFornecedores();
  }, []);

  useEffect(() => {
    setFilteredFornecedores(
      fornecedores.filter((fornecedor) =>
        fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, fornecedores]);

  const fetchFornecedores = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fornecedor');
      if (response.data && response.data.fornecedor && Array.isArray(response.data.fornecedor)) {
        setFornecedores(response.data.fornecedor);
      } else {
        console.error('Dados inválidos:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error.message);
    }
  };

  const showModalHandler = (type, fornecedor = {codigo: '', nome: '', cnpj: '', email: '', telefone: '', endereco: '' }) => {
    setModalType(type);
    setCurrentFornecedor(fornecedor);
    setShowModal(true);
  };
  
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFornecedor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'Add') {
        const response = await axios.post('http://localhost:3000/fornecedor', currentFornecedor);
        setFornecedores([...fornecedores, response.data]);
      } else if (modalType === 'Edit') {
        await axios.put(`http://localhost:3000/fornecedor`, currentFornecedor);
        setFornecedores(fornecedores.map((fornecedor) => (fornecedor.codigo === currentFornecedor.codigo ? currentFornecedor : fornecedor)));
      }
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error.message);
    }
  };

  const handleDelete = async (codigo) => {
    try {
      await axios.delete(`http://localhost:3000/fornecedor`, { data: { codigo } });
      setFornecedores(fornecedores.filter((fornecedor) => fornecedor.codigo !== codigo));
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error.message);
    }
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
              <th>Cnpj</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereco</th>
            </tr>
          </thead>
          <tbody>
            {filteredFornecedores.map((fornecedor) => (
              <tr key={fornecedor.codigo}>
                <td>{fornecedor.codigo}</td>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.email}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.endereco}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(fornecedor.codigo)}>Excluir</Button>
                  <Button variant="primary" onClick={() => showModalHandler('Edit', fornecedor)}>Alterar</Button>
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
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={currentFornecedor.nome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCnpj">
              <Form.Label>Cnpj</Form.Label>
              <Form.Control
                type="number"
                name="cnpj" 
                value={currentFornecedor.cnpj}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentFornecedor.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTelefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="tel"
                name="telefone"
                value={currentFornecedor.telefone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEndereco">
              <Form.Label>Endereco</Form.Label>
              <Form.Control
                type="text"
                name="endereco"
                value={currentFornecedor.endereco}
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

export default Table_Fornecedores;
