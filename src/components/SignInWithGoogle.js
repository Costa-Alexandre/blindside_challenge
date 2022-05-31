import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/google-logo.svg';
import '../styles/SignInWithGoogle.css';

function SignInWithGoogle() {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleClick() {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  }

  return (
    <div className="text-center">
      <button disabled={loading} type="button" onClick={handleClick}>
        <img src={logo} alt="google icon" id="google-icon" />
      </button>
    </div>
  );
}

export default SignInWithGoogle;
