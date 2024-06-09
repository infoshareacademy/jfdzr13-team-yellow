import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import bgImage from './assets/login_background.webp';


const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <img src={bgImage} alt="Background" className={styles.loginImage} />
      </div>
      <div className={styles.loginRight}>
        <Link to="/register" className={styles.registerLink}>Rejestracja</Link>
        <h2 className={styles.loginTitle}>Logowanie</h2>
        <p className={styles.loginSubtitle}>Wpisz poniżej swój adres email oraz hasło</p>
        <form className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="example@example.pl" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Hasło</label>
            <input type="password" id="password" placeholder="••••••••" required />
          </div>
          <Link to="/reset-password" className={styles.forgotPassword}>Nie pamiętasz hasła?</Link>
          <button type="submit" className={styles.loginButton}>Zaloguj</button>
        </form>
        <div className={styles.loginFooter}>
          <Link to="#" className={styles.footerLink}>Warunki świadczenia usług</Link> | <Link to="#" className={styles.footerLink}>Polityka prywatności</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
