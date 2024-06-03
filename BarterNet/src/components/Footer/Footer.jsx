import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumn}>
        <h3>O nas</h3>
        <ul>
          <li>
            <a href="#">Polityka Prywatności</a>
          </li>
          <li>
            <a href="#">Regulamin</a>
          </li>
          <li>
            <a href="#">Pomoc</a>
          </li>
        </ul>
      </div>
      <div className={styles.footerColumn}>
        <h3>Usługi</h3>
        <ul>
          <li>
            <a href="#">Rejestracja</a>
          </li>
          <li>
            <a href="#">Logowanie</a>
          </li>
          <li>
            <a href="#">Twoje Ogłoszenia</a>
          </li>
        </ul>
      </div>
      <div className={styles.footerColumn}>
        <h3>Kontakt</h3>
        <ul>
          <li>
            <a href="#">Polityka prywatności</a>
          </li>
          <li>
            <a href="#">Regulamin</a>
          </li>
          <li>
            <a href="#">Pomoc</a>
          </li>
        </ul>
      </div>
      <div className={styles.footerColumn}>
        <h3>Social Media</h3>
        <ul>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Twitter</a>
          </li>
          <li>
            <a href="#">LinkedIn</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
