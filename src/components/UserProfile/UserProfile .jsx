import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    // State variables
    const [username, setUsername] = useState(''); // Input field for GitHub username
    const [userData, setUserData] = useState(null); // User data fetched from GitHub API
    const [editableData, setEditableData] = useState({
        name: '',
        bio: '',
        company: '',
        location: '',
    }); // Editable user data

    // Function to fetch user data from the GitHub API
    const fetchUserData = () => {
        axios.get(`https://api.github.com/users/${username}`)
            .then((response) => {
                // Set the user data and populate editableData with initial values
                setUserData(response.data);
                setEditableData({
                    name: response.data.name || '', // Name of the user
                    bio: response.data.bio || '', // Bio/description of the user
                    company: response.data.company || '', // User's company
                    location: response.data.location || '', // User's location
                });
            })
            .catch((error) => {
                console.error('Error fetching data from GitHub API:', error);
            });
    };

    // useEffect hook to fetch user data when the component loads or when username changes
    useEffect(() => {
        if (username) {
            fetchUserData();
        }
    }, [username]);

    // Function to handle changes in the editable data fields
    const handleFieldChange = (field, value) => {
        setEditableData({
            ...editableData,
            [field]: value,
        });
    };

    // Function to save the editable data (you should implement the actual saving logic)
    const saveEditableData = () => {
        console.log('Saving changes:', editableData); // You can add logic to save changes to your server here
    };

    return (
        <div className="user-profile-container">
            <h1 className="profile-header">User Profile</h1>
            <div className="search-input">
                <input
                    type="text"
                    placeholder="GitHub Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button className="fetch-button" onClick={fetchUserData}>Get Profile</button>
            </div>
            {userData ? (
                <div className="profile-details">
                    <div className="avatar">
                        <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
                    </div>
                    <div className="info">
                        <p className="info-item">Name: {editableData.name}</p>
                        <input
                            type="text"
                            value={editableData.name}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                        />
                        <p className="info-item">Login: {userData.login}</p>
                        <p className="info-item">Email: {userData.email || 'N/A'}</p>
                        <p className="info-item">Company: {editableData.company}</p>
                        <input
                            type="text"
                            value={editableData.company}
                            onChange={(e) => handleFieldChange('company', e.target.value)}
                        />
                        <p className="info-item">Location: {editableData.location}</p>
                        <input
                            type="text"
                            value={editableData.location}
                            onChange={(e) => handleFieldChange('location', e.target.value)}
                        />
                        <p className="info-item">Bio:</p>
                        <textarea
                            value={editableData.bio}
                            onChange={(e) => handleFieldChange('bio', e.target.value)}
                        />
                        <p className="info-item">Profile Link: <a href={userData.html_url} target="_blank" rel="noopener noreferrer">{userData.html_url}</a></p>
                        <button className="save-button" onClick={saveEditableData}>Save Changes</button>
                    </div>
                </div>
            ) : (
                <p className="no-profile-message">Enter a GitHub username and click "Get Profile".</p>
            )}
        </div>
    );
};

export default UserProfile;
