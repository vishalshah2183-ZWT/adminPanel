import { useState } from 'react';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

// const [state,setState] = useState()

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'All Products',
    path: '/user',
    icon:  icon('ic_cart'),
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
 /*  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  }, */
  {
    title: 'Add Users',
    path: '/addUsers',
    icon: icon('ic_user'),
  },
  {
    title: 'Manage Module',
    path: '/manageModule',
    icon: icon('ic_user'),
  },
  {
    title: 'Manage Roles',
    path: '/manageRoles',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
