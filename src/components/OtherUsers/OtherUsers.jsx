import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OtherUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      // Выполняем запрос к GitHub API для поиска пользователей
      axios.get(`https://api.github.com/search/users?q=${searchTerm}`)
        .then((response) => {
          setSearchResults(response.data.items);
        })
        .catch((error) => {
          console.error('Ошибка при запросе к GitHub API:', error);
        });
    }
  }, [searchTerm]);

  const handleUserSelect = (user) => {
    // Загружаем публичные репозитории выбранного пользователя
    axios.get(`https://api.github.com/users/${user.login}/repos`)
      .then((response) => {
        setSelectedUser({ ...user, repos: response.data });
      })
      .catch((error) => {
        console.error('Ошибка при запросе к GitHub API:', error);
      });
  };

  return (
    <div>
      <h1>Другие пользователи</h1>
      <input
        type="text"
        placeholder="Искать пользователей"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((user) => (
            <li key={user.id}>
              <p>Логин: {user.login}</p>
              <button onClick={() => handleUserSelect(user)}>Посмотреть репозитории</button>
            </li>
          ))}
        </ul>
      )}
      {selectedUser && (
        <div>
          <h2>Публичные репозитории пользователя: {selectedUser.login}</h2>
          <ul>
            {selectedUser.repos.map((repo) => (
              <li key={repo.id}>
                <p>Название: <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OtherUsers;
