import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginTEMP from '../pages/Login/LoginTEMP.jsx';
import User from '../pages/User/User.jsx';
import Home from '../pages/Home.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginTEMP />} />
      <Route path="/user" element={<User />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;