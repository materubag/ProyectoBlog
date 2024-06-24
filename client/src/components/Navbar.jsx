import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/OIG.png';
import User from '../img/user.png';
import Post from '../img/post.png';
import Mod from '../img/mod.png';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const closeDropdown = () => {
    setIsDropdownOpen(false); // Cierra el desplegable al hacer clic en un enlace
  };

  return (
    <div className='navbar'>
      <div className='container'>
        <Link className='Link' to='/'>
          <div className='logo'>
            <img src={Logo} alt='Logo' />
          </div>
        </Link>
        {isMobile ? (
          // Renderizado para dispositivos móviles
          <button className='menu-toggle' onClick={toggleDropdown}>
            Menú <span>&#9660;</span>
          </button>
        ) : (
          // Renderizado para PCs
          <div className='links'>
            <Link className='Link' to='/?cat=art' onClick={() => handleCatChange('art')}>
          <h6>Arte</h6>
        </Link>
        <Link className='Link' to='/?cat=cine' onClick={() => handleCatChange('cine')}>
          <h6>Cine</h6>
        </Link>
        <Link className='Link' to='/?cat=music' onClick={() => handleCatChange('music')}>
          <h6>Música</h6>
        </Link>
        <Link className='Link' to='/?cat=science' onClick={() => handleCatChange('science')}>
          <h6>Ciencia</h6>
        </Link>
        <Link className='Link' to='/?cat=sports' onClick={() => handleCatChange('sports')}>
          <h6>Deportes</h6>
        </Link>
        <Link className='Link' to='/?cat=technology' onClick={() => handleCatChange('technology')}>
          <h6>Tecnologia</h6>
        </Link>
            <div className='vertical-line'></div>
            {currentUser && currentUser.mod === 1 && (
              <Link className='Link' to='/moderation'>
                <div className='write'>
                  <img src={Mod} alt='Moderator Icon' />
                </div>
              </Link>
            )}
            <Link className='Link' to='/write'>
              <div className='write'>
                <img src={Post} alt='Post Icon' />
              </div>
            </Link>
            <Link className='Link' to='/profile'>
              <div className='user'>
                <img src={User} alt='User Icon' />
              </div>
            </Link>
          </div>
        )}
        {/* Desplegable para móviles y PCs */}
        <div className={`dropdown ${isDropdownOpen && isMobile ? 'open' : ''}`}>
        {currentUser && currentUser.mod === 1 && (
            <Link className='Link' to='/moderation' onClick={closeDropdown}>
              <div className='write'>
                <img src={Mod} alt='Moderator Icon' />
              </div>
            </Link>
          )}
          <Link className='Link' to='/write' onClick={closeDropdown}>
            <div className='write'>
              <img src={Post} alt='Post Icon' />
            </div>
          </Link>
          <Link className='Link' to='/profile' onClick={closeDropdown}>
            <div className='user'>
              <img src={User} alt='User Icon' />
            </div>
          </Link>
        <Link className='Link' to='/?cat=art' onClick={closeDropdown}>
            <h6>Arte</h6>
          </Link>
          <Link className='Link' to='/?cat=cine' onClick={closeDropdown}>
            <h6>Cine</h6>
          </Link>
          <Link className='Link' to='/?cat=music' onClick={closeDropdown}>
            <h6>Música</h6>
          </Link>
          <Link className='Link' to='/?cat=science' onClick={closeDropdown}>
            <h6>Ciencia</h6>
          </Link>
          <Link className='Link' to='/?cat=sports' onClick={closeDropdown}>
            <h6>Deportes</h6>
          </Link>
          <Link className='Link' to='/?cat=technology' onClick={() => handleCatChange('technology')}>
          <h6>Tecnologia</h6>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;