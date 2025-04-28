import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Home = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  if (isAuthenticated) {
    return <Redirect to="/modules" />;
  }

  return (
    <HomeContainer>
      <div className="hero">
        <h1>Master Any Subject with Flashcards</h1>
        <p className="lead">
          A powerful flashcard application designed to help you learn and remember important concepts
        </p>
        <div className="buttons">
          <Link to="/register" className="btn-primary">Get Started</Link>
          <Link to="/login" className="btn-secondary">Login</Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature-item">
          <div className="feature-icon">📚</div>
          <h3>Multiple Modules</h3>
          <p>Organize your flashcards into different subject modules</p>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">📊</div>
          <h3>Track Progress</h3>
          <p>Monitor your learning with detailed session logs</p>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">🌓</div>
          <h3>Dark Mode</h3>
          <p>Study comfortably with light and dark themes</p>
        </div>
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  margin: 2rem 0;
  
  .hero {
    text-align: center;
    padding: 3rem 1rem;
    background-color: ${({ theme }) => theme.cardBg};
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow};
    margin-bottom: 2rem;
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: ${({ theme }) => theme.primary};
    }
    
    .lead {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      
      a {
        padding: 0.8rem 1.5rem;
        border-radius: 4px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s;
      }
      
      .btn-primary {
        background-color: ${({ theme }) => theme.primary};
        color: white;
        
        &:hover {
          background-color: ${({ theme }) => theme.primaryHover};
        }
      }
      
      .btn-secondary {
        background-color: transparent;
        border: 2px solid ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.primary};
        
        &:hover {
          background-color: ${({ theme }) => theme.primary};
          color: white;
        }
      }
    }
  }
  
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    
    .feature-item {
      background-color: ${({ theme }) => theme.cardBg};
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      box-shadow: ${({ theme }) => theme.shadow};
      transition: transform 0.3s;
      
      &:hover {
        transform: translateY(-5px);
      }
      
      .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      
      h3 {
        color: ${({ theme }) => theme.primary};
        margin-bottom: 0.8rem;
      }
      
      p {
        color: ${({ theme }) => theme.text};
        font-size: 0.95rem;
      }
    }
  }
`;

export default Home;