
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import './styles.css';

function App(){
  const token = localStorage.getItem('token');
  return <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={ token ? <Dashboard/> : <Navigate to='/login' /> } />
      <Route path='/tickets' element={ token ? <Tickets/> : <Navigate to='/login' /> } />
    </Routes>
  </BrowserRouter>
}

createRoot(document.getElementById('root')).render(<App />);
