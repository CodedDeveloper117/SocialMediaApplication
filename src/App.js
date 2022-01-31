import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home';
import NotFound from './components/NotFound'

const App = () => {
  const navigate = useNavigate();
  const [loggedOut, setLoggedout] = useState(false)
  return (
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Login loggedOut={loggedOut} setLoggedOut={setLoggedout} />} />
        <Route path="/*" element={<Home setLoggedOut={setLoggedout} />} />
      </Routes>
  );
};

export default App;
