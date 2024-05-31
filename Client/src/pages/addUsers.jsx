import { Helmet } from 'react-helmet-async';

import { AddUsersView } from 'src/sections/addUsers/view';

// ----------------------------------------------------------------------

export default function AddUsersPage() {
  return (
    <>
      <Helmet>
        <title> Add Users </title>
      </Helmet>

      <AddUsersView />
    </>
  );
}