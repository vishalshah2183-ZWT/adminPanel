import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { MyContext } from 'src/context/MyContext';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  );
}
