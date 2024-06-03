import React from "react";

import styles from "./header.module.css";

import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";

const Header = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <img src={logo1} alt="Logo1" className={styles.logo1} />
        </div>
        <div className={styles.navCenter}>
          <img src={logo2} alt="Logo2" className={styles.logo2} />
        </div>
        <div className={styles.navRight}>
          <button className={styles.navButton1}>
            Zarejestruj się | Zaloguj
          </button>
          <button className={styles.navButton2}>Dodaj ogłoszenie</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
