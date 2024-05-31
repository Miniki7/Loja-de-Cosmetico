import { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
//dados do usuario para enviar
  const [nome, setNome] = useState(true)
  const [email, setEmail] = useState(true)
  
  function postData(){
    try{
      axios.post('http://localhost:3000/clientes',{
        nome: nome,
        email: email,
        cargo_id: 1
      });
      alert('Usuario add com sucesso');
      setNome('')
      setEmail('')
      getData();
    } catch(e){
      console.log(e);
    }
  }
  async function getData(){
    
    try {
      setTimeout(async () => {
        const response = await axios.get('http://localhost:3000/clientes');
        setData(response.data.clientes);
        setLoading(false);
        console.log(response.data.clientes);
      }, 1000);

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div> 
      <h1> Lista de Clientes </h1>
      {loading && data.length <= 0 ? (
      <p> Carregando... </p>
      ) : ( 
        data.map(cliente => {
        return (
          <div key={cliente.nome}> 
            <p>
              {cliente.nome} {cliente.senha} {' '} {cliente.cargo} 
            </p>
          </div> 
          );
        })
      )}
      <div>
        <input id='nome' value={nome} placeholder='Nome' onChange={e=> setNome(e.target.value)}/>
        <input id='email' value={email} placeholder='Email' onChange={e=> setEmail(e.target.value)}/>
        <button onClick={postData}>Enter</button>
      </div>
    </div>
  )
}
export default App
