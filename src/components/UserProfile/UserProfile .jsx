import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [username, setUsername] = useState(''); // Начальное значение имени пользователя
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
        console.log('Сохранение изменений:', editableData);
    };

    return (
        <div className="user-profile-container">
        <h1 className="profile-header">Профиль пользователя</h1>
        <div className="search-input">
            <input
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button className="fetch-button" onClick={fetchUserData}>Получить профиль</button>
        </div>
        {userData ? (
            <div className="profile-details">
                <div className="avatar">
                    <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
                </div>
                <div className="info">
                    <p className="info-item">Имя: {editableData.name}</p>
                    <input
                        type="text"
                        value={editableData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                    />
                    <p className="info-item">Логин: {userData.login}</p>
                    <p className="info-item">Имейл: {userData.email || 'Нет данных'}</p>
                    <p className="info-item">Компания: {editableData.company}</p>
                    <input
                        type="text"
                        value={editableData.company}
                        onChange={(e) => handleFieldChange('company', e.target.value)}
                    />
                    <p className="info-item">Местоположение: {editableData.location}</p>
                    <input
                        type="text"
                        value={editableData.location}
                        onChange={(e) => handleFieldChange('location', e.target.value)}
                    />
                    <p className="info-item">Описание профиля (био):</p>
                    <textarea
                        value={editableData.bio}
                        onChange={(e) => handleFieldChange('bio', e.target.value)}
                    />
                    <p className="info-item">Ссылка на профиль: <a href={userData.html_url} target="_blank" rel="noopener noreferrer">{userData.html_url}</a></p>
                    <button className="save-button" onClick={saveEditableData}>Сохранить изменения</button>
                </div>
            </div>
        ) : (
            <p className="no-profile-message">Введите имя пользователя и нажмите "Получить профиль".</p>
        )}
    </div>
    
    );
}

export default UserProfile;