import React, { useRef, useState } from 'react';
import { Form, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logotype from '../assets/Logotype_White_Web.svg';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      navigate('/login', {
        state: { message: 'Password reset email sent! Check your inbox.' },
      });
    } catch {
      setError('Failed to send reset password email');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <img src={logotype} alt="" />
          <h2 className="text-center mt-4">Password Reset</h2>
          {error && <Alert variant="danger">{error} </Alert>}
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
            <button
              disabled={loading}
              className="w-100 my-2 login-button"
              type="submit"
            >
              Reset Password
            </button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Log in</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
