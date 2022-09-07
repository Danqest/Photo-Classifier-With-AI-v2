import { createContext, useState, useContext, useEffect } from "react";

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = (props) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark-content');
      document.querySelector('.pro-sidebar-inner').classList.add('dark-content');
    } else {
      document.body.classList.remove('dark-content');
      document.querySelector('.pro-sidebar-inner').classList.remove('dark-content');
    }
  }, [darkTheme]);

  const toggleTheme = () => {
    return setDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;