import React, { useEffect, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';
import ReactPlayer from 'react-player';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
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

  const { displayName, email, photoURL } = currentUser;

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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error} </Alert>}
          {message && <Alert variant="success">{message} </Alert>}
          <strong>Email: {email} </strong>
          <p>Name: {displayName}</p>
          <img src={photoURL} alt="profile pic" />
          <ReactPlayer url={url} controls={true} />
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
}
