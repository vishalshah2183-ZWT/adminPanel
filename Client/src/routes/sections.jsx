import { lazy, Suspense, useContext, useEffect, useMemo, useState } from 'react';
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
import { isModuleEmpty } from 'src/utils/HelperFunctions';
// ----------------------------------------------------------------------



export default function Router() {
/*   const [user,setUser] = useState()
  const [modules , setModules] =  useState([])
  useEffect(()=>{
    const User =Cookies.get('user') &&  JSON.parse(Cookies.get('user'))
    setUser(User)
    setModules(User?.access?.map((module)=> Object.keys(module)).flat())
  },[Cookies]) */

  const { user,setUser , cookieFlag } = useContext(MyContext)



  const [modules , setModules] =  useState([])

  const { updatedNavConfig } = useContext(MyContext)
  // console.log(updatedNavConfig)
  // const pathsOfUpdatedNavConfig = updatedNavConfig?.map((item)=>item?.path)
  const pathsOfUpdatedNavConfig = useMemo(()=>updatedNavConfig?.map((item)=>item?.path),[updatedNavConfig])
  // console.log(pathsOfUpdatedNavConfig,"&&&")


  // const routes = user?.token != "DummyToken" ?
  console.log(cookieFlag)
  const routes = cookieFlag        ?
  ( updatedNavConfig?.length > 1 &&  useRoutes([
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
        // { element: <IndexPage />, index: true },
        { path: '/' ,element: <IndexPage />, index: true },
        { path: '/user', element: pathsOfUpdatedNavConfig?.includes('/user') ?<UserPage /> :  <Navigate to="/404" replace />},
        { path: '/products', element: pathsOfUpdatedNavConfig?.includes('/products') ? <ProductsPage />:  <Navigate to="/404" replace /> },
        { path: '/blog', element: pathsOfUpdatedNavConfig?.includes('/blog') ? <BlogPage />:  <Navigate to="/404" replace /> },
        { path: '/addUsers', element: pathsOfUpdatedNavConfig?.includes('/addUsers') ? <AddUsersPage/>:  <Navigate to="/404" replace /> },
        { path: '/manageRoles', element: pathsOfUpdatedNavConfig?.includes('/manageRoles') ? <ManageRolesPage/>:  <Navigate to="/404" replace /> },
        { path: '/addRole', element: pathsOfUpdatedNavConfig?.includes('/manageRoles') ? <AddRolePage/>:  <Navigate to="/404" replace /> },
        { path: '/updateRole/:id', element: pathsOfUpdatedNavConfig?.includes('/manageRoles') ? <UpdateRoleView/>:  <Navigate to="/404" replace /> },
        { path: '/manageModule', element: pathsOfUpdatedNavConfig?.includes('/manageModule') ? <ManageModulePage/> :  <Navigate to="/404" replace />},
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
  ])

  ):
  (
    useRoutes([
    {
      path: '*',
      element: <LoginPage />,
    }
  ])
  )
return routes;
}
