import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserHomePage from "./components/UserHomePage/UserHomePage";
import PasswordsReset from "./components/PasswordsReset/PasswordsReset";
import MyAccount from "./components/MyAccount/MyAccount";
import MyProfile from "./components/MyProfile/MyProfile";
import MyProfileEdit from "./components/MyProfileEdit/MyProfileEdit";
import SingleAd from "./components/SingleAd/SingleAd";
import AddListing from "./components/AddListing/AddListing";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="passwordReset" element={<PasswordsReset />} />{" "}

        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<UserHomePage />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/ad/:adId" element={<SingleAd />} />
          <Route path="/myProfile/edit" element={<MyProfileEdit />} />
          <Route path="/addListing" element={<AddListing />} />
          {/* Tutaj dodamy kolejne routy dla zalogowanych userów  */}
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}

export default App;
