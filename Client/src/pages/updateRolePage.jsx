import { Helmet } from 'react-helmet-async';

import { UpdateRoleView } from 'src/sections/updateRole/view';

// ----------------------------------------------------------------------

export default function UserPage() {

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UpdateRoleView />
    </>
  );
}