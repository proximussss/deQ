import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
  }

  button {
    cursor: pointer;
    font-family: 'Arial', sans-serif;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .btn {
    display: inline-block;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: ${({ theme }) => theme.primaryHover};
    }
  }

  .btn-secondary {
    background-color: ${({ theme }) => theme.secondary};
    
    &:hover {
      background-color: ${({ theme }) => theme.secondaryHover};
    }
  }

  .btn-danger {
    background-color: ${({ theme }) => theme.danger};
    
    &:hover {
      background-color: ${({ theme }) => theme.dangerHover};
    }
  }

  .hidden {
    display: none;
  }
`;

export default GlobalStyles;
