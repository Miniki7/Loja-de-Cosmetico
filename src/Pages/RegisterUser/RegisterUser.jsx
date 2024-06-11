import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegisterUser.css'

const RegisterUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== repeatPassword) {
            alert("As senhas não coincidem!");
            return;
        }
    
        const userData = {
            name,
            email,
            password
        };

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
    
            if (!response.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }
    
            console.log("Usuário cadastrado com sucesso!");
            setName("");
            setEmail("");
            setPassword("");
            setRepeatPassword("");
            navigate("/login");
            
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error.message);
        }
    }


  return (
    <div className='loginsignup'>

      <div className="loginsignup-container">
                
            <form className="form-login" onSubmit={handleSubmit}>
                <h1 className="title-login">Cadastre-se</h1>
                <p className="tips">Nome</p>
                <div className="input-icon">
                    <input
                        className="input-login"
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <p className="tips">E-mail</p>
                <div className="input-icon">
                    <input
                        className="input-login"
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <p className="tips">Senha</p>
                <div className="input-icon">
                    <input
                        className="input-login"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p className="tips">Repita a senha</p>
                <div className="input-icon">
                    <input
                        className="input-login"
                        type="password"
                        placeholder="Repita a senha"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="login-submit" type="submit">Cadastrar</button>
            </form>
        </div>
        </div>
  )
}

export default RegisterUser

/* 
      <form className="form-login"  onSubmit={handleSubmit}>
          <h1 className="title-login" >Entre com uma conta</h1>
          <p className="tips"  >E-mail</p>
          <div className="input-icon" >
              <input className="input-login" type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required />
              <FaUser className="icon-login" />
          </div>
          <p >Senha</p>
          <div >
              <input className="input-login" type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} required />
              <FaLock className="icon-login" />
          </div>
          <Link className="register-login" to="/user-register">Cadastre-se</Link>
          <button  type="submit">Login</button>
          </form>
      </div>
      </div>
    </div> */








/* 
    import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cosmetic from "../../../assets/cosmetic.jpg";

const RegisterUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== repeatPassword) {
            alert("As senhas não coincidem!");
            return;
        }
    
        const userData = {
            name,
            email,
            password
        };

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
    
            if (!response.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }
    
            console.log("Usuário cadastrado com sucesso!");
            setName("");
            setEmail("");
            setPassword("");
            setRepeatPassword("");
            navigate("/login");
            
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error.message);
        }
    }
    
    return (
        <div className="container-login">
            <div id="container-thumb">
                <img src={cosmetic} id="thumb" alt="foto ilustrativa cosmetico" />
            </div>
            <form id="form-login" onSubmit={handleSubmit}>
                <h1 id="title-login">Cadastre-se</h1>
                <p className="tips">Nome</p>
                <div className="input-icon">
                    <input
                        className="input-login"
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <p className="tips">E-mail</p>
                <div className="input-icon">
                    <input
                        className="input-login"
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <p className="tips">Senha</p>
                <div className="input-icon">
                    <input
                        className="input-login"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p className="tips">Repita a senha</p>
                <div className="input-icon">
                    <input
                        className="input-login"
                        type="password"
                        placeholder="Repita a senha"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />
                </div>
                <button id="login-submit" type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default RegisterUser; */
