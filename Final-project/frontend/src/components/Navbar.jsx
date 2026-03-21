import React from 'react'
import {Link,useNavigate} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const hl = ()=>{
        localStorage.removeItem('token');
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
            <button className='btn btn-dark btn-sm' onClick={hl}>Logout</button>
            </>
        )}
    </ul>


  </div>
  
  
  </>
}

export default Navbar