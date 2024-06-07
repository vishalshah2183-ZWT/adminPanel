import { Helmet } from 'react-helmet-async';

import { ManageModuleView } from 'src/sections/manageModules/view'

// ----------------------------------------------------------------------

export default function ManageRolesPage() {
  return (
    <>
      <Helmet>
        <title> Manage Modules </title>
      </Helmet>

      <ManageModuleView />
    </>
  );
}