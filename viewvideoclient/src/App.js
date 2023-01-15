import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Renew from './components/Renew';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <NavBar />
        <div className='row min-vh-100'>
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/home" element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/renew' element={<Renew />} />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;