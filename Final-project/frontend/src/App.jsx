import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoute from './utils/PrivateRoute'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Orders from './pages/Orders'

const App = () => {
  return <>
  <BrowserRouter>
  <Navbar/>
  <Routes>

    <Route path='/' element={<Register/>}></Route>
     <Route path='/login' element={<Login/>}></Route>

     <Route element={<PrivateRoute/>}>
     <Route path='/home' element={<Home/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
       <Route path='/orders' element={<Orders/>}></Route>
     </Route>
  </Routes>
  
  
  </BrowserRouter>
  
  
  </>
}

export default App