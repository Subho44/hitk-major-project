import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
