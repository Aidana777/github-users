import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        // Make a request to your server to fetch the authenticated user's data
        axios.get('http://localhost:3000/profile') // Измените URL, если необходимо
            .then((response) => {
                setUser(response.data);
                setName(response.data.username);
                setCompany(response.data.company || '');
                setLocation(response.data.location || '');
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        // Make a request to your server to update the user's profile data
        axios.put('http://localhost:3000/profile', {
            username: name,
            company,
            location
        })
        .then((response) => {
            setUser(response.data);
            setIsEditing(false);
        })
        .catch((error) => {
            console.error('Error updating user data:', error);
        });
    };

    return (
        <div className="user-profile-container">
            <h1 className="profile-header">User Profile</h1>
            {user ? (
                <div className="profile-details">
                    <div className="avatar">
                        <img src={user.avatar_url} alt={`${user.username}'s avatar`} />
                    </div>
                    <div className="info">
                        {isEditing ? (
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        ) : (
                            <p className="info-item">Name: {name}</p>
                        )}
                        <p className="info-item">Email: {user.email || 'N/A'}</p>
                        {isEditing ? (
                            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                        ) : (
                            <p className="info-item">Company: {company || 'N/A'}</p>
                        )}
                        {isEditing ? (
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        ) : (
                            <p className="info-item">Location: {location || 'N/A'}</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="no-profile-message">Please login to view your profile.</p>
            )}
            {isEditing ? (
                <button onClick={handleSaveProfile}>Save</button>
            ) : (
                <button onClick={handleEditProfile}>Edit Profile</button>
            )}
        </div>
    );
};

export default UserProfile;
