import React from 'react'
import Logo from '../img/OIG.png';
import User from '../img/user.png';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <Link className='Link' to="/">
          <div className='logo'>
            <img src={Logo} alt="Logo" />
          </div>
        </Link>

        <div className='links'>
          <Link className='Link' to="/?cat=art">
            <h6>Arte</h6>
          </Link>
          <Link className='Link' to="/?cat=cine">
            <h6>Cine</h6>
          </Link>
          <Link className='Link' to="/?cat=music">
            <h6>Música</h6>
          </Link>
          <span className='write'>
            <Link className='Link' to="/write">Post</Link>
          </span>
          <Link className='Link' to="/profile">
            <div className='user'>
              <img src={User} alt="User" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
