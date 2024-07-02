import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AddListing from "./components/AddListing/AddListing";
import EditListing from "./components/EditListing/EditListing";
import ContactForm from "./components/ContactForm/ContactForm";
import HelpPage from "./components/HelpPage/HelpPage";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import MyAccount from "./components/MyAccount/MyAccount";
import MyAds from "./components/MyAds/MyAds";
import MyProfile from "./components/MyProfile/MyProfile";
import MyProfileEdit from "./components/MyProfileEdit/MyProfileEdit";
import PasswordsReset from "./components/PasswordsReset/PasswordsReset";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Register from "./components/Register/Register";
import SearchPage from "./components/SearchPage/SearchPage";
import SingleAd from "./components/SingleAd/SingleAd";
import TermsPage from "./components/TermsPage/TermsPage";
import UserHomePage from "./components/UserHomePage/UserHomePage";
import MessagesList from "./components/Message/MessagesList/MessagesList";
import OtherUserPage from "./components/OtherUserPage/OtherUserPage"
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="passwordReset" element={<PasswordsReset />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="contact" element={<ContactForm />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<UserHomePage />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/myAds" element={<MyAds />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/ad/:userId/:adId" element={<SingleAd />} />
          <Route path="/myProfile/edit" element={<MyProfileEdit />} />
          <Route path="/addListing" element={<AddListing />} />
          <Route path="/editListing/:id" element={<EditListing />} />
          <Route path="/user/:userId" element={<OtherUserPage />} />
          <Route path="/searchPage" element={<SearchPage />} />
          {/* Tutaj dodamy kolejne routy dla zalogowanych userów  */}
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}

export default App;
