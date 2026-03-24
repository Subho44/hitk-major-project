import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    navigate('/login');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark shadow-sm'>
      <div className='container'>
        <Link className='navbar-brand font-weight-bold' to={token ? '/home' : '/'}>
          MERN Shop
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto align-items-lg-center'>
            {!token ? (
              <>
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>Register</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link to='/home' className='nav-link'>Home</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/cart' className='nav-link'>Cart ({cart.length})</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/orders' className='nav-link'>Orders</Link>
                </li>
                <li className='nav-item ml-lg-2 mt-2 mt-lg-0'>
                  <button className='btn btn-danger btn-sm' onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
