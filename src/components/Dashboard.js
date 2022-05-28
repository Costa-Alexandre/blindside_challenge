import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
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

  const { displayName, email, photoURL } = currentUser;

  const storage = getStorage();
  getDownloadURL(ref(storage, 'react.png'))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // Or inserted into an <img> element
      const img = document.getElementById('myimg');
      img.setAttribute('src', url);
    })
    .catch((error) => {
      // Handle any errors
    });

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
          <img id="myimg" alt="firebase pic" />
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
