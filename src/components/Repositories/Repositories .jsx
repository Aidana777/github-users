import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './Repositories.css';

const Repositories = () => {
  const { username } = useParams();

  const [inputUsername, setInputUsername] = useState('');
  const [user, setUser] = useState(null);
  const [publicRepos, setPublicRepos] = useState([]);
  const [privateRepos, setPrivateRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async (username) => {
    try {
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      setUser(userResponse.data);
    } catch (error) {
      console.error('Ошибка при получении информации о пользователе:', error);
    }
  };

  const fetchUserRepos = async (username) => {
    try {
      const publicReposResponse = await axios.get(`https://api.github.com/users/${username}/repos?type=public`);
      const privateReposResponse = await axios.get(`https://api.github.com/users/${username}/repos?type=private`);

      setPublicRepos(publicReposResponse.data);
      setPrivateRepos(privateReposResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка при получении репозиториев:', error);
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (inputUsername) {
      fetchUserData(inputUsername);
      fetchUserRepos(inputUsername);
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserData(username);
      fetchUserRepos(username);
    }
  }, [username]);

  return (
    <div className="repositories-container">
      <h1 className='repositoriesTitle'>Репозитории пользователя {username || inputUsername}</h1>
      <div>
        <input
          type="text"
          placeholder="Введите имя пользователя"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          onKeyPress={handleEnterKeyPress}
        />
        <button onClick={handleSearch}>Найти</button>
      </div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : user ? (
        <div>
          <h2>{user.name}</h2>
          <img className='repositories-containerimg' src={user.avatar_url} alt="Аватар" />
          <p>Публичные репозитории: {user.public_repos}</p>
          <nav>
            <ul>
              <li>
                <NavLink to="public" activeClassName="active">
                  Публичные репозитории
                </NavLink>
              </li>
              <li>
                <NavLink to="private" activeClassName="active">
                  Приватные репозитории
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <p>Пользователь не найден.</p>
      )}
      <Routes>
        <Route path="public" element={(
          <div>
            <h2>Публичные репозитории</h2>
            {publicRepos.length > 0 ? (
              <ul>
                {publicRepos.map((repo) => (
                  <li key={repo.id}>
                    <a className='repLink' href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='repositories-containertext '>Нет публичных репозиториев.</p>
            )}
          </div>
        )} />
        <Route path="private" element={(
          <div>
            <h2>Приватные репозитории</h2>
            {privateRepos.length > 0 ? (
              <ul>
                {privateRepos.map((repo) => (
                  <li key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='repositories-containertext '>Нет приватных репозиториев.</p>
            )}
          </div>
        )} />
      </Routes>
    </div>
  );
};

export default Repositories;

