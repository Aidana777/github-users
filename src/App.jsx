import React from 'react';
import { BrowserRouter as Routes, Route, Link } from 'react-router-dom';

import UserProfile from './components/UserProfile/UserProfile '; // Ваш компонент для профиля пользователя
import Repositories from './components/Repositories/Repositories '; // Ваш компонент для репозиториев
import OtherUsers from './components/OtherUsers/OtherUsers'; // Ваш компонент для поиска других пользователей

const App = () => {
  return (
    <div>
      <Routes>
        <div>
          <header>
            <h1>GitHub Dashboard</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Профиль</Link>
                </li>
                <li>
                  <Link to="/repositories">Репозитории</Link>
                </li>
                <li>
                  <Link to="/other-users">Другие пользователи</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>

            <Route path="/repositories">
              <Repositories />
            </Route>
            <Route path="/other-users">
              <OtherUsers />
            </Route>
            <Route path="/">
              <UserProfile />
            </Route>

          </main>
        </div>
      </Routes>
    </div>
  );
}

export default App;
