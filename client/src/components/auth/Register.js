import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/modules" />;
  }

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <RegisterContainer>
      <h1>Register</h1>
      <p className="lead">Create your account</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          Register
        </button>
      </form>
      <p className="already">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  
  h1 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.primary};
  }
  
  .lead {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  input {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.cardBg};
    color: ${({ theme }) => theme.text};
  }
  
  button {
    width: 100%;
    padding: 0.8rem;
    margin-top: 0.5rem;
  }
  
  .already {
    margin-top: 1rem;
    text-align: center;
  }
`;

export default Register;