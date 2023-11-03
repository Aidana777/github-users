import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Repositories = () => {
  const [publicRepos, setPublicRepos] = useState([]);
  const [privateRepos, setPrivateRepos] = useState([]);
  const [activeTab, setActiveTab] = useState('public');

  useEffect(() => {
    // Загрузка публичных репозиториев при монтировании компонента
    axios.get('https://api.github.com/user/repos?visibility=public')
      .then((response) => {
        setPublicRepos(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при запросе к GitHub API:', error);
      });

    // Загрузка приватных репозиториев
    axios.get('https://api.github.com/user/repos?visibility=private')
      .then((response) => {
        setPrivateRepos(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при запросе к GitHub API:', error);
      });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderRepos = activeTab === 'public' ? publicRepos : privateRepos;

  return (
    <div>
      <h1>Репозитории</h1>
      <div className="tabs">
        <button onClick={() => handleTabChange('public')} className={activeTab === 'public' ? 'active' : ''}>Публичные</button>
        <button onClick={() => handleTabChange('private')} className={activeTab === 'private' ? 'active' : ''}>Приватные</button>
      </div>
      <ul>
        {renderRepos.map((repo) => (
          <li key={repo.id}>
            <p>Название: <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></p>
            <p>Владелец: <a href={repo.owner.html_url} target="_blank" rel="noopener noreferrer">{repo.owner.login}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Repositories;
