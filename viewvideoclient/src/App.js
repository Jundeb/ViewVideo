import React, { useEffect } from 'react';
import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Renew from './components/Renew';
import NotFound from './components/NotFound';

import UserContext from './context/UserProvider.js';
import LicenseContext from './context/LicenseProvides.js';

function App() {

  const { user, setUser } = useContext(UserContext);
  const { license, setLicense } = useContext(LicenseContext);

  useEffect(() => {
    if (user.userId == null && window.localStorage.getItem('userId') !== null && window.localStorage.getItem('username') !== null && window.localStorage.getItem('balance') !== null) {
      const userId = JSON.parse(window.localStorage.getItem('userId'));
      const username = JSON.parse(window.localStorage.getItem('username'));
      const balance = JSON.parse(window.localStorage.getItem('balance'));

      setUser(prev => {
        return { ...prev, userId: userId, username: username, balance: balance }
      });
    }

    if (license.licenseId == null && window.localStorage.getItem('licenseId') !== null && window.localStorage.getItem('expirationDate') !== null) {
      const licenseId = JSON.parse(window.localStorage.getItem('licenseId'));
      const expirationDate = JSON.parse(window.localStorage.getItem('expirationDate'));

      setLicense(prev => {
        return { ...prev, licenseId: licenseId, expirationDate: expirationDate }
      });
    }
  }, []);

  return (
    <div className='container'>
      <BrowserRouter>
        <NavBar />
        <div className='row min-vh-100'>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/renew' element={<Renew />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;