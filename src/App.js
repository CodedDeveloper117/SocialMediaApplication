import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home';

const App = () => {
  const navigate = useNavigate();
  const [loggedOut, setLoggedout] = useState(false)
  return (
      <Routes>
        <Route path="login" element={<Login loggedOut={loggedOut} setLoggedOut={setLoggedout} />} />
        <Route path="/*" element={<Home setLoggedOut={setLoggedout} />} />
      </Routes>
  );
};

export default App;
