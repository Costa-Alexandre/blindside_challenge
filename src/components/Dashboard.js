import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';
import ReactPlayer from 'react-player';
import Navbar from './Navbar';
import Gallery from './Gallery';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { message } = useLocation().state || '';
  const [url, setUrl] = useState('');

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  const getUrl = async (path) => {
    const storage = getStorage();
    const url = await getDownloadURL(ref(storage, path));
    setUrl(url);
  };

  useEffect(() => {
    getUrl('ski.mp4');
  }, []);

  return (
    <>
      <Navbar />
      {error && <Alert variant="danger">{error} </Alert>}
      {message && <Alert variant="success">{message} </Alert>}
      <ReactPlayer url={url} controls={true} />
      <button variant="link" onClick={handleLogout}>
        Log out
      </button>
      <Gallery />
    </>
  );
}
