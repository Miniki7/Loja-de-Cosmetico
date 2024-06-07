import React from 'react';
import './CSS/Menu_de_Cadastros.css';
import { Link } from 'react-router-dom';

const Menu_de_Cadastros = () =>{
    return(
        <div className='container'>
            <Link to={"/Crud_Produtos"}>
            <button className="button-admin-home">Cadastra Produtos</button>
            </Link>
            <Link to={"/Crud_Usuarios"}>
            <button className="button-admin-home">Cadastra Fornecedores</button>
            </Link>
            <br/>
            <Link to={"/Crud_Fornecedor"}>
            <button className="button-admin-home">Cadastra Usuários </button>
            </Link>
        </div>
    )
}

export default Menu_de_Cadastros