import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const About = () => {
  return (
    <AboutContainer>
      <div className="about-content">
        <h1>About This App</h1>
        <p className="lead">
          This is a full-featured flashcard application designed for students
          and lifelong learners.
        </p>

        <h2>Features</h2>
        <ul>
          <li>
            <strong>Multiple Module Support:</strong> Organize your flashcards
            into different subject modules
          </li>
          <li>
            <strong>Progress Tracking:</strong> Monitor your learning with
            detailed session logs
          </li>
          <li>
            <strong>Card Management:</strong> Add, edit, and organize your
            flashcards easily
          </li>
          <li>
            <strong>User Authentication:</strong> Secure your data with
            email/password or Google login
          </li>
          <li>
            <strong>Dark Mode:</strong> Study comfortably with light and dark
            themes
          </li>
          <li>
            <strong>Responsive Design:</strong> Use on desktop or mobile devices
          </li>
        </ul>

        <h2>Tech Stack</h2>
        <p>This application is built with modern web technologies:</p>
        <ul>
          <li>
            <strong>Frontend:</strong> React.js, Redux, Styled Components
          </li>
          <li>
            <strong>Backend:</strong> Node.js, Express.js
          </li>
          <li>
            <strong>Database:</strong> PostgreSQL
          </li>
          <li>
            <strong>Authentication:</strong> JWT, Google OAuth
          </li>
          <li>
            <strong>Deployment:</strong> Azure
          </li>
        </ul>

        <div className="back-button">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  margin: 2rem 0;

  .about-content {
    background-color: ${({ theme }) => theme.cardBg};
    border-radius: 8px;
    padding: 2rem;
    box-shadow: ${({ theme }) => theme.shadow};

    h1 {
      color: ${({ theme }) => theme.primary};
      margin-bottom: 1rem;
    }

    h2 {
      color: ${({ theme }) => theme.primary};
      margin: 1.5rem 0 0.8rem;
    }

    .lead {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    ul {
      margin-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }

    .back-button {
      margin-top: 2rem;

      .btn-primary {
        display: inline-block;
        padding: 0.7rem 1.2rem;
        background-color: ${({ theme }) => theme.primary};
        color: white;
        text-decoration: none;
        border-radius: 4px;

        &:hover {
          background-color: ${({ theme }) => theme.primaryHover};
        }
      }
    }
  }
`;

export default About;
