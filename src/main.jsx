import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';
import ShopContextProvider from './Context/ShopContext'; 
import Crud_Fornecedor from './Pages/Admin/Crud_Fornecedor'
import Crud_Produto from './Pages/Admin/Crud_Produto'
import Crud_Usuario from './Pages/Admin/Crud_Usuario'
import Menu_de_Cadastros from './Pages/Admin/Menu_de_Cadastros'
import RegisterUser from './Pages/RegisterUser/RegisterUser'



import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';

//import da estilização da tabela
import 'bootstrap/dist/css/bootstrap.min.css';


const Layout = () => (
  <div>
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
  {
    path: "/",
    element: <Home />
  },
  {
    path: '/maquiagem',
    element: <ShopCategory banner={men_banner} category="men" />
  },
  {
    path: '/perfumaria',
    element: <ShopCategory banner={women_banner} category="women" />
  },
  {
    path: '/cabelos',
    element: <ShopCategory banner={kids_banner} category="kid" />
  },
  {
    path: '/unhas',
    element: <ShopCategory banner={kids_banner} category="kid" />
  },
  {
    path: '/product',
    element: <Product />
  },
  {
    path: '/product/:productId',
    element: <Product />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/login',
    element: <LoginSignup />
  },
  {
    path: '/user-register',
    element: <RegisterUser />
  },
  {
    path: '/menu_cad',
    element: <Menu_de_Cadastros />
  },
  {
    path: '/Crud_Produtos',
    element: <Crud_Produto />
  },
  {
    path: '/Crud_Usuarios',
    element: <Crud_Usuario/>
  },
  {
    path: '/Crud_Fornecedor',
    element: <Crud_Fornecedor />
  }
],
  },
]);
export default router;  



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopContextProvider>
     
    <RouterProvider router={router}/>
          
    </ShopContextProvider>
  </React.StrictMode>
);
