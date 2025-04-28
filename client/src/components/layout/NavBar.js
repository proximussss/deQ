import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../../actions/auth";
import { toggleTheme } from "../../actions/theme";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);

  const onLogout = () => {
    dispatch(logout());
  };

  const onToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const authLinks = (
    <ul>
      <li>
        <Link to="/modules">Modules</Link>
      </li>
      <li>
        <Link to="/sessions">Session Logs</Link>
      </li>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
      <li>
        <span className="username">Hello, {user && user.name}</span>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  );

  return (
    <NavbarContainer>
      <div className="navbar-inner">
        <h1>
          <Link to="/">Flashcards</Link>
        </h1>
        <div className="theme-toggle" onClick={onToggleTheme}>
          {darkMode ? "☀️" : "🌙"}
        </div>
        {!loading && (
          <div className="links">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        )}
      </div>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.5rem 2rem;

  .navbar-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;

    a {
      color: white;
      text-decoration: none;
    }
  }

  .links {
    display: flex;
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-left: 1.5rem;

    a {
      color: white;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .username {
    color: #f0f0f0;
    font-weight: bold;
  }

  .theme-toggle {
    font-size: 1.2rem;
    cursor: pointer;
    margin: 0 1rem;
  }
`;

export default Navbar;
