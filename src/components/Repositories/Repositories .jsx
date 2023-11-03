import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Route, Routes } from 'react-router-dom';
import axios from 'axios';

const Repositories = () => {
    const { username } = useParams();

    const [publicRepos, setPublicRepos] = useState([]);
    const [privateRepos, setPrivateRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.github.com/users/${username}/repos?visibility=public`)
            .then((response) => {
                setPublicRepos(response.data);
            })
            .catch((error) => {
                console.error('Error while fetching public repositories:', error);
            });

        axios.get(`https://api.github.com/users/${username}/repos?visibility=private`)
            .then((response) => {
                setPrivateRepos(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error while fetching private repositories:', error);
                setIsLoading(false);
            });
    }, [username]);

    return (
        <div>
            <h1>Репозитории пользователя {username}</h1>
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

            {isLoading ? (
                <p>Загрузка...</p>
            ) : (
                <Routes>
                    <Route path="public" element={(
                        <div>
                            <h2>Публичные репозитории</h2>
                            <ul>
                                {publicRepos.map((repo) => (
                                    <li key={repo.id}>
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                            {repo.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )} />
                    <Route path="private" element={(
                        <div>
                            <h2>Приватные репозитории</h2>
                            <ul>
                                {privateRepos.map((repo) => (
                                    <li key={repo.id}>
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                            {repo.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )} />
                </Routes>
            )}
        </div>
    );
};

export default Repositories;
