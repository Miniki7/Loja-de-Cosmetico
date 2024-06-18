import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import './CSS/LoginSignup.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de envio de formulário

    try {
      // Simulando a verificação de usuário com uma requisição GET (substitua por sua lógica de verificação)
      const response = await axios.get("http://localhost:3000/usuario");

      // Verifica se a resposta foi bem-sucedida
      if (response.status === 200) {
        console.log("Login bem-sucedido", response.data);
        
        // Redireciona para a página com o endpoint cad_menu
        navigate("/menu_cad");
      } else {
        console.error("Erro de login", response);
      }
    } catch (error) {
      console.error("Erro de rede", error);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <form className="form-login" onSubmit={handleSubmit}>
          <h1 className="title-login">Entre com uma conta</h1>
          <p className="tips">E-mail</p>
          <div className="input-icon">
            <input className="input-login" type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required />
            <FaUser className="icon-login" />
          </div>
          <p>Senha</p>
          <div>
            <input className="input-login" type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required />
            <FaLock className="icon-login" />
          </div>
          <Link className="register-login" to="/user-register">Cadastre-se</Link>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;