import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login, loginWithGoogle } from '../../actions/auth';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
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
    dispatch(login(email, password));
  };

  const googleSuccess = res => {
    dispatch(loginWithGoogle(res.tokenId));
  };

  const googleFailure = error => {
    console.error('Google Login Error:', error);
  };

  return (
    <LoginContainer>
      <h1>Login</h1>
      <p className="lead">Access your account</p>
      <form onSubmit={onSubmit}>
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
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          Login
        </button>
      </form>
      
      <div className="google-login">
        <p>or</p>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={'single_host_origin'}
          redirectUri={window.location.origin}
        />
      </div>
      
      <p className="no-account">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
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
  
  .google-login {
    margin: 1.5rem 0;
    text-align: center;
    
    button {
      margin-top: 0.5rem;
    }
    
    p {
      margin: 0.5rem 0;
      color: ${({ theme }) => theme.text};
      opacity: 0.7;
    }
  }
  
  .no-account {
    margin-top: 1rem;
    text-align: center;
  }
`;

export default Login;