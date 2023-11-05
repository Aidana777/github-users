import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Make a request to your server to fetch the authenticated user's data
        axios.get('http://localhost:3000/profile') // Измените URL, если необходимо
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <div className="user-profile-container">
            <h1 className="profile-header">User Profile</h1>
            {user ? (
                <div className="profile-details">
                    <div className="avatar">
                        <img src={user.avatar_url} alt={`${user.username}'s avatar`} />
                    </div>
                    <div className="info">
                        <p className="info-item">Name: {user.username}</p>
                        <p className="info-item">Email: {user.email || 'N/A'}</p>
                        <p className="info-item">Company: {user.company || 'N/A'}</p>
                        <p className="info-item">Location: {user.location || 'N/A'}</p>
                    </div>
                </div>
            ) : (
                <p className="no-profile-message">Please login to view your profile.</p>
            )}
        </div>
    );
};

export default UserProfile;
