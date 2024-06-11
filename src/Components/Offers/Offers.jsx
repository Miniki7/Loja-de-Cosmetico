import React from 'react'
import './Offers.css'
import exclucive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusivo</h1>
        <h1>Ofertas para você</h1>
        <p>SOMENTE OS PRODUTOS MAIS VENDEDOS</p>
        <button>Verifique agora</button>
      </div>
      <div className="offers-right">
        <img src={exclucive_image} alt="" />
      </div>
      
    </div>
  )
}

export default Offers
