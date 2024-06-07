import React, { useContext, useState} from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {

    const [menu, setMenu] = useState("home");
    const {getTotalCartItems} = useContext(ShopContext);

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>VENUSTAS</p>
        </div> 

        <ul className='nav-menu'>

        <li onClick={() => {setMenu("home")}}><Link style={{textDecoration:'none'}} to='/' >Home</Link> {menu==="home" ? <hr/> : <></>}</li>
        <li onClick={() => {setMenu("maquiagem")}}><Link style={{textDecoration:'none'}} to='/maquiagem'>Maquiagem</Link>{menu==="maquiagem" ? <hr/> : <></>}</li>
        <li onClick={() => {setMenu("perfumaria")}}><Link style={{textDecoration:'none'}}  to='/perfumaria'>Perfumaria</Link>{menu==="perfumaria" ? <hr/> : <></>}</li>
        <li onClick={() => {setMenu("cabelos")}}><Link style={{textDecoration:'none'}} to='/cabelos'>Cabelos</Link>{menu==="cabelos" ? <hr/> : <></>}</li>
        <li onClick={() => {setMenu("unhas")}}><Link style={{textDecoration:'none'}} to='/unhas'>Unhas</Link>{menu==="unhas" ? <hr/> : <></>}</li>
        
        </ul>
        <div className="nav-login-cart">
        <Link to='/login'> <button>Login</button> </Link> 
        <Link to='/cart'> <img src={cart_icon} alt=""/>  </Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div> 
        </div>
    </div>
  )
}

export default Navbar
