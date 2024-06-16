import React from 'react'
import { FaUser, FaLock } from "react-icons/fa"
import './CSS/LoginSignup.css'
import { useState, useEffect } from "react"
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginSignup = () => {

  const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    const teste = async () => {
        const response = await axios.get("http://localhost:3000/usuario");
        console.log(response.data.usuario);
        if (response.ok) {}
    }

    useEffect(() => {
        teste()
    }, [])

    const handleSubmit = async (event) => {
      event.preventDefault(); // Previne o comportamento padrão de envio de formulário
  
      try {
          // Faz uma requisição para a URL "http://localhost:3000/login" usando o método POST
          const response = await axios.get("http://localhost:3000/usuario");
  
          const data = await response; // Aguarda a resposta e a converte para JSON
          // Verifica se a resposta foi bem-sucedida
          if (response.ok) {
              console.log("Login bem-sucedido", data);
              // Se o login for bem-sucedido, redireciona para "/menu_cad"
              navigate("/Home");
          } else {
              console.error("Erro de login", data);
          }
      } catch (error) {
          console.error("Erro de rede", error);
      }
  }  


  return (
    <div className='loginsignup'>

      <div className="loginsignup-container">
      <form className="form-login"  onSubmit={handleSubmit}>
          <h1 className="title-login" >Entre com uma conta</h1>
          <p className="tips">E-mail</p>
          <div className="input-icon" >
              <input className="input-login" type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required />
              <FaUser className="icon-login" />
          </div>
          <p >Senha</p>
          <div >
              <input className="input-login" type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required />
              <FaLock className="icon-login" />
          </div>
          <Link className="register-login" to="/user-register">Cadastre-se</Link>
          <button  type="submit">Login</button>
          </form>
      </div>
    </div>
  )
}

export default LoginSignup
