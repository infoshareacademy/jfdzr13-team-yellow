
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contex/AuthProvider";

import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import styles from "./Header.module.css";
import addListingIcon from '../../assets/icons/addListingIcon.png'; 
import searchIcon from '../../assets/icons/searchIcon.png';
import myProfileIcon from '../../assets/icons/myProfileIcon.png';
import messagesIcon from '../../assets/icons/messagesIcon.png';

const Header = () => {
  const { currentUser } = useAuth();


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
            if (!currentUser) {
              return (
                <>
                <NavLink to="/login">
                    <button className={styles.navButton1}>
                      Zarejestruj się | Zaloguj
                    </button>
                  </NavLink>
                <NavLink to="/login">
                    <button className={styles.navButton2}>
                    <img src={addListingIcon} alt="Add icon" className={styles.icon} />
                    <span>DODAJ OGŁOSZENIE</span>
                    </button>
                  </NavLink>
                  <NavLink to="/login" >
                    <button className={styles.navButton2}>
                    <img src={searchIcon} alt="Search icon" className={styles.icon} />
                      <span>WYSZUKAJ OGŁOSZENIE</span>
                      </button>
                  </NavLink>
                </>
              );
            } else {
              return (
                <>
                <NavLink to="/addlisting">
                  <button className={styles.navButton2}>
                  <img src={addListingIcon} alt="Add icon" className={styles.icon} />
                  <span>DODAJ OGŁOSZENIE</span>
                  </button>
                </NavLink>
                <NavLink to="/searchpage" >
                  <button className={styles.navButton2}>
                  <img src={searchIcon} alt="Search icon" className={styles.icon} />
                    <span>WYSZUKAJ OGŁOSZENIE</span>
                    </button>
                </NavLink>
                <NavLink to="/messages">
                    <button className={styles.navButton2}>
                      <img src={messagesIcon} alt="Messages icon" className={styles.icon} />
                      <span>WIADOMOŚCI</span>
                    </button>
                  </NavLink>
                <NavLink to="/myaccount">
                  <button className={styles.navButton2}>
                  <img src={myProfileIcon} alt="My profile" className={styles.icon} />
                    <span>MOJE<br/>KONTO</span>
                  </button>
                </NavLink>
              </>
              );
            }
          })()}

        </div>
      </nav>
      { (currentUser) && (
          <div className={styles.navBottom}></div>
        ) }
    </header>
  );
};

export default Header;