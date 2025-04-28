import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "./themes";
import GlobalStyles from "./GlobalStyles";

const ThemeProvider = ({ children }) => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
