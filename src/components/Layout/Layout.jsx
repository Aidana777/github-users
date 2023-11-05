import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Header = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <header className="header">
      <h1 className="header-title">GitHub Dashboard</h1>
      <div
        className={`burger-menu ${isBurgerMenuOpen ? 'open' : ''}`}
        onClick={toggleBurgerMenu}
      >
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>
      <nav className={`header-nav ${isBurgerMenuOpen ? 'open' : ''}`}>
        <ul className="header-nav-list">
          <li className="header-nav-item">
            <Link to="/profile" className="header-nav-link">
              Профиль
            </Link>
          </li>
          <li className="header-nav-item">
            <Link to="/repositories" className="header-nav-link">
              Репозитории
            </Link>
          </li>
          <li className="header-nav-item">
            <Link to="/other-users" className="header-nav-link">
              Другие пользователи
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
