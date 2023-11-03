import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OtherUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`https://api.github.com/search/users?q=${searchTerm}&page=${currentPage}&per_page=10`)
        .then((response) => {
          setSearchResults(response.data.items);
          setTotalResults(response.data.total_count);
          setSearchTerm(''); // Clear the search input
        })
        .catch((error) => {
          console.error('Error while fetching data from GitHub API:', error);
        });
    }
  }, [searchTerm, currentPage]);

  const handleUserSelect = (user) => {
    // Load the selected user's public repositories
    axios
      .get(`https://api.github.com/users/${user.login}/repos`)
      .then((response) => {
        setSelectedUser({ ...user, repos: response.data });
      })
      .catch((error) => {
        console.error('Error while fetching data from GitHub API:', error);
      });
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalResults / 10); // Assuming 10 results per page.

  return (
    <div className="other-users-container">
      <h1 className="title">Other Users</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search for users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResults.length > 0 && (
        <div>
          <p className="search-results">Search results: {totalResults} users found</p>
          <ul className="user-list">
            {searchResults.map((user) => (
              <li key={user.id} className="user-item">
                <p className="user-login">Login: {user.login}</p>
                <button
                  className="view-repositories-button"
                  onClick={() => handleUserSelect(user)}
                >
                  View Repositories
                </button>
              </li>
            ))}
          </ul>
          {totalResults > 10 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      {selectedUser && (
        <div className="selected-user">
          <h2 className="selected-user-title">
            Public Repositories of {selectedUser.login}
          </h2>
          <ul className="repository-list">
            {selectedUser.repos.map((repo) => (
              <li key={repo.id} className="repository-item">
                <p className="repository-name">
                  Name: <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OtherUsers;
