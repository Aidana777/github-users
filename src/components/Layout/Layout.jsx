import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Header = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  // Создайте массив элементов навигации
  const navigationItems = [
    { to: '/profile', text: 'Профиль' },
    { to: '/repositories', text: 'Репозитории' },
    { to: '/other-users', text: 'Другие пользователи' },
  ];

  // Создайте массив элементов burger-line
  const burgerLines = Array.from({ length: 3 }, (_, index) => (
    <div key={index} className="burger-line"></div>
  ));

  return (
    <header className="header">
      <h1 className="header-title">GitHub Dashboard</h1>
      <div
        className={`burger-menu ${isBurgerMenuOpen ? 'open' : ''}`}
        onClick={toggleBurgerMenu}
      >
        {burgerLines}
      </div>
      <nav className={`header-nav ${isBurgerMenuOpen ? 'open' : ''}`}>
        <ul className="header-nav-list">
          {navigationItems.map((item, index) => (
            <li key={index} className="header-nav-item">
              <Link to={item.to} className="header-nav-link">
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
