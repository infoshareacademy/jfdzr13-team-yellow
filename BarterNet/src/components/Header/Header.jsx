import { signOut } from "firebase/auth";
import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuth } from "../../contex/AuthProvider";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import styles from "./header.module.css";
// import UserIcon from "./assets/userIcon.svg";
const Header = () => {
  const { currentUser } = useAuth();

  const handleLogOut = () => {
    return signOut(auth);
  };

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <a href="/">
            <img src={logo1} alt="Logo1" className={styles.logo1} />
          </a>
        </div>
        <div className={styles.navCenter}>
          <img src={logo2} alt="Logo2" className={styles.logo2} />
        </div>
        <div className={styles.navRight}>
          {(() => {
            if (currentUser) {
              return (
                <>
                  <NavLink to="/myaccount">
                    <button className={styles.navButton1}>
                      {/* <img src={UserIcon} className={styles.icon} /> */}
                      Moje konto
                    </button>
                  </NavLink>
                  <NavLink to="/add">
                    <button className={styles.navButton2}>
                      Dodaj ogłoszenie
                    </button>
                  </NavLink>

                  <button onClick={handleLogOut} className={styles.navButton1}>
                    Wyloguj
                  </button>
                </>
              );
            } else {
              return (
                <>
                  <NavLink to="/login">
                    <button className={styles.navButton1}>
                      Zarejestruj się | Zaloguj
                    </button>
                  </NavLink>
                  <NavLink to="/login">
                    <button className={styles.navButton2}>
                      Dodaj ogłoszenie
                    </button>
                  </NavLink>
                </>
              );
            }
          })()}
        </div>
      </nav>
    </header>
  );
};
export default Header;
