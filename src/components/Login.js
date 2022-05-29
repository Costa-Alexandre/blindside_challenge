import React, { useRef, useState } from 'react';
import { Form, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SignInWithGoogle from './SignInWithGoogle';
import logotype from '../assets/Logotype_White_Web.svg';
import '../styles/Login.css';

export default function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = useLocation().state || '';

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  }

  return (
    <>
      <Card className="card">
        <Card.Body>
          <img src={logotype} alt="" />
          <h2 className="text-center mt-4">Login</h2>
          {error && <Alert variant="danger">{error} </Alert>}
          {message && <Alert variant="success">{message} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                className="mb-2"
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                className="mb-2"
                required
              />
            </Form.Group>
            <button
              disabled={loading}
              className="w-100 mt-4 login-button"
              type="submit"
            >
              Log In
            </button>
          </Form>
          <div className="text-center mt-4">
            <p>
              <strong>Or login with</strong>
            </p>
          </div>
          <SignInWithGoogle />
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
