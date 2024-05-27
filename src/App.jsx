import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
/* importando os componentes que vão estar em todas as paginas */
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer'
/* importando as paginas para navegação */
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
/* importando imagens da pasta assets */
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'

/* men, women and kids são nossas props(propriedades) */

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid"/>}/>
        
        <Route path='/product' element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
      </Route>

      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;
