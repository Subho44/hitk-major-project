import React from 'react'
import {Link,useNavigate} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const hl = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        navigate('/login');
    }

  return <>
  <div className='container-fluid'>
    <ul className='nav float-right'>
        <li>
            <Link to='/' className='nav-link'>Register</Link>
        </li>
        <li>
            <Link to='/login' className='nav-link'>Login</Link>
        </li>

        {token && (
            <>
             <li>
            <Link to='/home' className='nav-link'>Home</Link>
             </li>
              <li>
            <Link to='/cart' className='nav-link'>Cart ({cart.length})</Link>
             </li>
              <li>
            <Link to='/orders' className='nav-link'>Orders</Link>
             </li>
            <button className='btn btn-dark btn-sm' onClick={hl}>Logout</button>
            </>
        )}
    </ul>


  </div>
  
  
  </>
}

export default Navbar