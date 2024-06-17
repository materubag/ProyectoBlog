import React from 'react';
import Logo from '../img/Blog.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const isMobile = window.innerWidth <= 768; 

  return (
    <footer>
      <img src={Logo} alt="Logo" />
      <p>
        <Link className='mod' to="/modregister">Trabaja con nosotros</Link>
      </p>
      {!isMobile && ( 
        <span>Hecho con CHAT GPT👌 para usted ing con mucho cariño</span>
      )}
    </footer>
  );
};

export default Footer;