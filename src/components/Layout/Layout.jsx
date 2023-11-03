import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">GitHub Dashboard</h1>
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li className="header-nav-item">
            <Link to="/" className="header-nav-link">Профиль</Link>
          </li>
          <li className="header-nav-item">
            <Link to="/repositories" className="header-nav-link">Репозитории</Link>
          </li>
          <li className="header-nav-item">
            <Link to="/other-users" className="header-nav-link">Другие пользователи</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
