/* importando o React e o arquivo css */
import React from 'react';
import './Hero.css';
/* importando as imagens da pasta assets */
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image_removebg_preview from '../Assets/hero_image_removebg_preview.png'

/* Componente que cria os primeiros itens da pagina, como banner ou imagens */
const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>APENAS NOVIDADES</h2>
        <div>

          <div className="hero-hand-icon">
            <p>Novas</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>coleções</p>
          <p>para todos</p>
        </div>
        <div className="hero-latest-btn">
          <div>Últimas coleção</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>

      <div className="hero-right">
        <img src={hero_image_removebg_preview} alt="" />
      </div>
    </div>
  )
}

export default Hero
