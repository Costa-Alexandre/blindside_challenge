import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Gallery from './Gallery';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { message } = useLocation().state || '';

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <>
      <Navbar />
      {error && <Alert variant="danger">{error} </Alert>}
      {message && <Alert variant="success">{message} </Alert>}
      <Gallery />
      <button variant="link" onClick={handleLogout}>
        Log out
      </button>
    </>
  );
}
