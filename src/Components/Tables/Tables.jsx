import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Tables.css'

const Tables = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    // Simulate a server fetch
    const data = [
      { codigo: 1, nome: 'Fiction' },
      { codigo: 2, nome: 'Non-fiction' },
      { codigo: 3, nome: 'Science' },
    ];
    setCategories(data);
  };

  const handleDelete = (codigo) => {
    setCategories(categories.filter((cat) => cat.codigo !== codigo));
  };

  return (

    <div className="container-fluid mt-4">
    <div className="margim">
      <h2>Lista de Categoria:</h2>
      <Form className="mb-3 d-flex">
        <Form.Control
          type="text"
          placeholder="Nome ..."
          className="mr-2"
        />
        <Button variant="primary">Pesquisar</Button>
        <Button variant="primary" onClick={() => handleShowModal('Add')}>Cadastrar</Button>
      </Form>
      <table className="table table-striped w-100">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nome</th>
            <th>Operacao</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.codigo}>
              <td>{category.codigo}</td>
              <td>{category.nome}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(category.codigo)}>Excluir</Button>
                <Button variant="primary" onClick={() => handleShowModal('Edit', category)}>Alterar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};
export default Tables;

/* // src/Components/Tables/CategoryTable.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Tables.css'

const Tables = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentCategory, setCurrentCategory] = useState({ codigo: '', nome: '' });

  useEffect(() => {
    // Fetch categories from server
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    // Simulate a server fetch
    const data = [
      { codigo: 1, nome: 'Fiction' },
      { codigo: 2, nome: 'Non-fiction' },
      { codigo: 3, nome: 'Science' },
    ];
    setCategories(data);
  };

  const handleShowModal = (type, category) => {
    setModalType(type);
    setCurrentCategory(category || { codigo: '', nome: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'Add') {
      setCategories([...categories, currentCategory]);
    } else if (modalType === 'Edit') {
      setCategories(categories.map((cat) => (cat.codigo === currentCategory.codigo ? currentCategory : cat)));
    }
    handleCloseModal();
  };

  const handleDelete = (codigo) => {
    setCategories(categories.filter((cat) => cat.codigo !== codigo));
  };

  return (
    <div className="container">
      <h2>Lista de Categoria:</h2>
      <Form className="mb-3" onSubmit={(e) => { e.preventDefault(); }}>
        <Form.Control
          type="text"
          placeholder="Nome ..."
          name="nome"
          value={currentCategory.nome}
          onChange={handleChange}
          className="mb-2"
        />
        <Button variant="primary" onClick={() => handleShowModal('Add')}>Cadastrar</Button>
      </Form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nome</th>
            <th>Operacao</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.codigo}>
              <td>{category.codigo}</td>
              <td>{category.nome}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(category.codigo)}>Excluir</Button>
                <Button variant="primary" onClick={() => handleShowModal('Edit', category)}>Alterar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'Add' ? 'Adicionar' : 'Alterar'} um registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                type="text"
                name="codigo"
                value={currentCategory.codigo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={currentCategory.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">{modalType === 'Add' ? 'Cadastrar' : 'Alterar'}</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tables;
 */