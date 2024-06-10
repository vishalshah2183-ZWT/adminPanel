import { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const AddUsersPage = lazy(() => import('src/pages/addUsers'));
export const  ManageRolesPage= lazy(() => import('src/pages/manageRoles'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const AddRolePage = lazy(() => import('src/pages/addRolesPage'));
export const UpdateRolePage = lazy(() => import('src/pages/updateRolePage'));
export const ManageModulePage = lazy(() => import('src/pages/manageModule'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
import Cookies from 'js-cookie';
import { UpdateRoleView } from 'src/sections/updateRole/view';
import { MyContext } from 'src/context/MyContext';
// ----------------------------------------------------------------------



export default function Router() {
/*   const [user,setUser] = useState()
  const [modules , setModules] =  useState([])
  useEffect(()=>{
    const User =Cookies.get('user') &&  JSON.parse(Cookies.get('user'))
    setUser(User)
    setModules(User?.access?.map((module)=> Object.keys(module)).flat())
  },[Cookies]) */

  const { user,setUser } = useContext(MyContext)
  const routes = useRoutes([
    {
      element: (user ||  Cookies.get('user') ) ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ):
      <Navigate to ="/login" replace/>,
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'addUsers', element: <AddUsersPage/> },
        { path: 'manageRoles', element: <ManageRolesPage/> },
        { path: 'addRole', element: <AddRolePage/> },
        { path: 'updateRole/:id', element: <UpdateRoleView/> },
        { path: 'manageModule', element: <ManageModulePage/> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
