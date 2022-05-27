import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [ error, setError ] = useState('');
  const [ loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      navigate('/login', { state: {message: "Password reset email sent! Check your inbox."}});
    } catch {
      setError('Failed to send reset password email');
    }
    setLoading(false);

  }

  return (
  <>
    <Card>
      <Card.Body>
        <h2 className='text-center mb-4'>Password Reset</h2>
        {error && <Alert variant="danger">{error} </Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} className="mb-2" required />
          </Form.Group>
          <Button disabled={loading} className="w-100 my-2" type="submit">Reset Password</Button>
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
