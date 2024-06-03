import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PublicHomePage from '../components/PublicHomePage/PublicHomePage';
import { useAuth } from '../contex/AuthProvider';

const PrivateRoute = () => {
const {currentUser} = useAuth();

//  -----  użytkownik testowy dla symulowania poprawności routingu. Usunąć gdy dostępna będzie funkcja logowania i wylogowania ----

// const currentUser = {
//   uid: 'test-uid',
//   email: 'test@example.com',
//   emailVerified: true,
//   displayName: 'Test User',
//   photoURL: 'https://example.com/user/photo.jpg',
// }

return currentUser ? (
  <Outlet />
) : (
  <>
    <Navigate to="/" />
    <PublicHomePage />
  </>
);
};

export default PrivateRoute