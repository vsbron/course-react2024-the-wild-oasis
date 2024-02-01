import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

// Creatinf Context
const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // Getting the data from local storage about dark mode status
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  // Custom toggle function
  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  // useEffect that changes the DOM each time the app's theme is changed
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Custom hook that returns the context
function useDarkMode() {
  const context = useContext(DarkModeContext);

  // Guard clause
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");

  return context;
}

export { DarkModeProvider, useDarkMode };
