import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Tables.css';

const Table_Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('Add');
  const [currentUsuario, setCurrentUsuario] = useState({ codigo: '', nome: '', email: '', senha: '', role: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    setFilteredUsuarios(
      usuarios.filter((user) =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, usuarios]);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuario');
      if (response.data && response.data.usuario && Array.isArray(response.data.usuario)) {
        setUsuarios(response.data.usuario);
      } else {
        console.error('Dados inválidos:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error.message);
    }
  };

  const showModalHandler = (type, usuario = { codigo: '', nome: '', email: '', senha: '', role: '' }) => {
    setModalType(type);
    setCurrentUsuario(usuario);
    setShowModal(true);
  };
  
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'Add') {
        const response = await axios.post('http://localhost:3000/usuario', currentUsuario);
        setUsuarios([...usuarios, response.data]);
      } else if (modalType === 'Edit') {
        await axios.put(`http://localhost:3000/usuario`, currentUsuario);
        setUsuarios(usuarios.map((user) => (user.codigo === currentUsuario.codigo ? currentUsuario : user)));
      }
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error.message);
    }
  };

  const handleDelete = async (codigo) => {
    try {
      await axios.delete(`http://localhost:3000/usuario`, { data: { codigo } });
      setUsuarios(usuarios.filter((user) => user.codigo !== codigo));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="margim">
        <h2>Lista de Usuários:</h2>
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
              <th>Código</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Role</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((user) => (
              <tr key={user.codigo}>
                <td>{user.codigo}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.senha}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(user.codigo)}>Excluir</Button>
                  <Button variant="primary" onClick={() => showModalHandler('Edit', user)}>Alterar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'Add' ? 'Adicionar Usuário' : 'Editar Usuário'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={currentUsuario.nome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentUsuario.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="text"
                name="senha"
                value={currentUsuario.senha}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={currentUsuario.role}
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
