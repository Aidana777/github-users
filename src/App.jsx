import React from 'react';
import { Routes, Route } from 'react-router-dom';

import UserProfile from './components/UserProfile/UserProfile ';
import Repositories from './components/Repositories/Repositories ';
import OtherUsers from './components/OtherUsers/OtherUsers';
import Layout from './components/Layout/Layout';
import Login from './components/Auto/Login';

const App = () => {
  return (
    <div>
      <Layout />
      <Routes>
        <Route path="repositories" element={<Repositories />} />
        <Route path="other-users" element={<OtherUsers />} />
        <Route index element={<Login />} />
        <Route path="profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;