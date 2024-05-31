// ----------------------------------------------------------------------
import Cookies from 'js-cookie';
const User = Cookies.get('user') ?  JSON.parse(Cookies.get('user'))?.User : 'DummyUser';
console.log(User)
export const account = {
  displayName: User?.email,
  email: User?.role,
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
