import React from 'react';
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Receba ofertas exclusivas no seu e-mail</h1>
        <p>Inscreva-se em nossos serviços e mantenha-se atualizado!</p>
        <div>
            <input type='email' placeholder='Digite seu email'/>
            <button>Inscrever-se</button>
        </div>
      
    </div>
  )
}

export default NewsLetter
