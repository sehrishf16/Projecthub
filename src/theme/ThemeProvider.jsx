import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";

import getTheme from "./theme";

const ThemeContext = createContext(null);

const THEME_KEY = "projecthub_theme_mode";

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode =
      localStorage.getItem(THEME_KEY);

    return savedMode === "dark"
      ? "dark"
      : "light";
  });

  const theme = useMemo(
    () => getTheme(mode),
    [mode]
  );

  useEffect(() => {
    localStorage.setItem(
      THEME_KEY,
      mode
    );
  }, [mode]);

  const toggleMode = () => {
    setMode((currentMode) =>
      currentMode === "light"
        ? "dark"
        : "light"
    );
  };

  const contextValue = {
    mode,
    setMode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider
      value={contextValue}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeSettings = () =>
  useContext(ThemeContext);

export default ThemeProvider;