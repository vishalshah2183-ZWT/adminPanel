/* eslint-disable perfectionist/sort-imports */
import { useState } from 'react';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { MyContext } from './context/MyContext';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  return (
      <ThemeProvider>
        <Router />
      </ThemeProvider>
  );
}
