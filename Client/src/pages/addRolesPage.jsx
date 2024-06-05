import { Helmet } from 'react-helmet-async';

import { AddRoleView } from 'src/sections/addRole/view';

// ----------------------------------------------------------------------

export default function AddUsersPage() {
  return (
    <>
      <Helmet>
        <title> Add Role  </title>
      </Helmet>

      <AddRoleView />
    </>
  );
}