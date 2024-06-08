import React from 'react';
import styles from './Login.module.css';
import bgImage from './assets/login_background.webp';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <img src={bgImage} alt="Background" className={styles.loginImage} />
      </div>
      <div className={styles.loginRight}>
      <a href="#" className={styles.registerLink}>Nie masz jeszcze konta? Rejestracja</a>
        <h2 className={styles.loginTitle}>Logowanie</h2>
        <p className={styles.loginSubtitle}>Wpisz poniżej swój adres email oraz hasło</p>
        <form className={styles.loginForm}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="example@example.pl" required />
          <label htmlFor="password">Hasło</label>
          <input type="password" id="password" placeholder="••••••••" required />
          <a href="#" className={styles.forgotPassword}>Nie pamiętasz hasła?</a>
          <button type="submit" className={styles.loginButton}>Zaloguj</button>
        </form>
        <div className={styles.loginDivider}>
          <span>LUB ZALOGUJ PRZEZ</span>
        </div>
        
        <div className={styles.loginFooter}>
          <a href="#">Warunki świadczenia usług</a> | <a href="#">Polityka prywatności</a>
        </div>
      </div>
    </div>
  );
};

export default Login;