import { Helmet } from 'react-helmet-async';
import { MyContext } from 'src/context/MyContext';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
 

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <AppView />
    </>
  );
}
