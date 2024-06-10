/* eslint-disable perfectionist/sort-imports */
import { useEffect, useState } from 'react';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { MyContext } from './context/MyContext';
import Cookies from 'js-cookie';
// import '../index.css'
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const [user, setUser] = useState()
  const [modules, setModules] = useState([])
  useEffect(() => {
    const User = Cookies.get('user') && JSON.parse(Cookies.get('user'))
    setUser(User)
    setModules(User?.access?.map((module) => Object.keys(module)).flat())
  }, [Cookies])
  return (
    <MyContext.Provider value={{ user, setUser }}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </MyContext.Provider>

  );
}
