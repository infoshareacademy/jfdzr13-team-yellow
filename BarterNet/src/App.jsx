import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserHomePage from './components/UserHomePage/UserHomePage';
import PasswordsReset from './components/PasswordsReset/PasswordsReset';
import MyAccount from './components/MyAccount/MyAccount';
import MyProfile from './components/MyProfile/MyProfile';
import MyProfileEdit from './components/MyProfileEdit/MyProfileEdit';
import PrivateRoute from './utils/PrivateRoute';
import TermsPage from './components/TermsPage/TermsPage';
import HelpPage from './components/HelpPage/HelpPage';
import ContactForm from './components/ContactForm/ContactForm';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy'; // Importuj nowy komponent

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='passwordReset' element={<PasswordsReset />} />
        <Route path='terms' element={<TermsPage />} />
        <Route path='help' element={<HelpPage />} />
        <Route path='contact' element={<ContactForm />} />
        <Route path='privacy-policy' element={<PrivacyPolicy />} /> {/* Nowa trasa do polityki prywatności */}
        <Route path='/' element={<PrivateRoute />}>
          <Route index element={<UserHomePage />} />
          <Route path='/myAccount' element={<MyAccount />} />
          <Route path='/myProfile' element={<MyProfile />} />
          <Route path='/myProfile/edit' element={<MyProfileEdit />} />
          {/* Tutaj dodamy kolejne routy dla zalogowanych userów */}
        </Route>
        <Route path='*' element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  );
}

export default App;
