import React from "react";
import styles from "./Footer.module.css";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumn}>
        <h3>O nas</h3>
        <ul>
          <li>
            <Link to="/privacy-policy">Polityka Prywatności</Link>
          </li>
          <li>
            <Link to="/terms">Regulamin</Link>
          </li>
          <li>
            <Link to="/help">Pomoc</Link>
          </li>
          <li>
            <Link to="/contact">Kontakt</Link>
          </li>
        </ul>
      </div>
      <div className={styles.footerColumn}>
        <h3>Usługi</h3>
        <ul>
          <li>
            <Link to="/register">Rejestracja</Link>
          </li>
          <li>
            <Link to="/login">Logowanie</Link>
          </li>
          <li>
            <Link to="/myAccount">Twoje Ogłoszenia</Link>
          </li>
        </ul>
      </div>
      <div className={styles.footerColumn}>
        <h3>Social Media</h3>
        <ul className={styles.socialMedia}>
          <li>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className={styles.icon} /> Facebook
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className={styles.icon} /> Twitter
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className={styles.icon} /> LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
