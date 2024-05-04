import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios";
import "./App.css";


function App() {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    cargo_id: 0,
  });
  function inserirUsuario() {
    axios.post("http:localhost:3000/usuarios", {
      body: {
        nome: user.nome,
        email: user.email,
        cargo_id: user.cargo_id,
      },
      header: {
        "Content-Type": "Application/Json",
      },
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <input
          type="text"
          id="nome"
          value={user.nome}
          placeholder="Nome"
          onChange={(e) => setUser({ ...user, nome: e.target.value })}
        />

        <input
          type="text"
          id="email"
          value={user.email}
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="text"
          id="cargo_id"
          value={user.cargo_id}
          placeholder="ID Cargo"
          onChange={(e) =>
            setUser({ ...user, cargo_id: parseInt(e.target.value) })
          }
        />
        <button style={{backgroundColor: 'cyan'}} onClick={() => inserirUsuario()}>
          Inserir Cliente
        </button>
      </div>
    </>
  )
}

export default App;