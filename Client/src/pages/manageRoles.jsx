import { Helmet } from 'react-helmet-async';

import { ManageRolesView } from 'src/sections/manageRoles/view'

// ----------------------------------------------------------------------

export default function ManageRolesPage() {
  return (
    <>
      <Helmet>
        <title> Manage Roles </title>
      </Helmet>

      <ManageRolesView />
    </>
  );
}