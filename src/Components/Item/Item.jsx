/* Props é uma forma reduzida de dizer propriedades. Elas são usadas para passar dados entre componentes.

dentro da tag img a funçao onClick serve para ser redirecionada para a pagina do produto clicado na posição inicial da pagina
*/
import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt=""/></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
             R${props.new_price}
            </div>
            <div className="item-price-old">
             R${props.old_price}
            </div>
        </div>
      
    </div>
  )
}

export default Item
