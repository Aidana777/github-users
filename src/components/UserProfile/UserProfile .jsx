import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [username, setUsername] = useState('tim'); // Начальное значение имени пользователя
    const [userData, setUserData] = useState(null);
    const [editableData, setEditableData] = useState({
        name: '',
        bio: '',
        company: '',
        location: ''
    });

    const fetchUserData = () => {
        axios.get(`https://api.github.com/users/${username}`)
            .then((response) => {
                setUserData(response.data);
                setEditableData({
                    name: response.data.name || '',
                    bio: response.data.bio || '',
                    company: response.data.company || '',
                    location: response.data.location || ''
                });
            })
            .catch((error) => {
                console.error('Ошибка при запросе к GitHub API:', error);
            });
    };

    useEffect(() => {
        // Запрашивать данные только если имя пользователя не пустое
        if (username) {
            fetchUserData();
        }
    }, [username]);

    const handleFieldChange = (field, value) => {
        setEditableData({
            ...editableData,
            [field]: value
        });
    };

    const saveEditableData = () => {
        // Ваш код для отправки изменений на сервер должен быть добавлен здесь
        // В этом примере, мы просто выводим в консоль, но вам нужно выполнить реальный запрос на сервер.
        console.log('Сохранение изменений:', editableData);
    };

    return (
        <div>
            <h1>Профиль пользователя</h1>
            <input
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={fetchUserData}>Получить профиль</button>
            {userData ? (
                <div>
                    <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
                    <p>Имя: {editableData.name}</p>
                    <input
                        type="text"
                        value={editableData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                    />
                    <p>Логин: {userData.login}</p>
                    <p>Имейл: {userData.email || 'Нет данных'}</p>
                    <p>Компания: {editableData.company}</p>
                    <input
                        type="text"
                        value={editableData.company}
                        onChange={(e) => handleFieldChange('company', e.target.value)}
                    />
                    <p>Местоположение: {editableData.location}</p>
                    <input
                        type="text"
                        value={editableData.location}
                        onChange={(e) => handleFieldChange('location', e.target.value)}
                    />
                    <p>Описание профиля (био): {editableData.bio}</p>
                    <textarea
                        value={editableData.bio}
                        onChange={(e) => handleFieldChange('bio', e.target.value)}
                    />
                    <p>Ссылка на профиль: <a href={userData.html_url} target="_blank" rel="noopener noreferrer">{userData.html_url}</a></p>
                    <button onClick={saveEditableData}>Сохранить изменения</button>
                </div>
            ) : (
                <p>Введите имя пользователя и нажмите "Получить профиль".</p>
            )}
        </div>
    );
}

export default UserProfile;
