import React from 'react'
import './Item.css'

const Item = (props) => {
  return (
    <div className='item'>
        <img src={props.image} alt="" />
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



/* Props é uma forma reduzida de dizer propriedades. Elas são usadas para passar dados entre componentes.*/