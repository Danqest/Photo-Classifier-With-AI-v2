import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from '../../utils/ThemeContext';
import './Theme.css';

export default function ThemeContextWrapper(props) {
  const [darkTheme, setTheme] = useState(true);

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark-content');
    } else {
      document.body.classList.remove('dark-content');
    }
    // switch (darkTheme) {
    //   case themes.light:
    //     document.body.classList.add('white-content');
    //     break;
    //   case themes.dark:
    //   default:
    //     document.body.classList.remove('white-content');
    //     break;
    // }
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ theme: darkTheme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

// export const lightTheme = {
//   body: '#FFF',
//   text: '#363537',
//   toggleBorder: '#FFF',
//   background: '#363537',
// }
// export const darkTheme = {
//   body: '#363537',
//   text: '#FAFAFA',
//   toggleBorder: '#6B8096',
//   background: '#999',
// }
