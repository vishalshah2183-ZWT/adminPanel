// ----------------------------------------------------------------------
import Cookies from 'js-cookie';

const User = JSON.parse(Cookies.get('user') || true);

console.log("account")
export const account = {
  displayName: User?.email,
  email: User?.role,
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
