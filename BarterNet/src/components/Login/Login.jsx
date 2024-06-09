import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase';
import styles from './Login.module.css';
import bgImage from './assets/login_background.webp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/UserHomePage');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Logowanie nieudane: ' + error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <img src={bgImage} alt="Background" className={styles.loginImage} />
      </div>
      <div className={styles.loginRight}>
        <Link to="/register" className={styles.registerLink}>Nie masz konta? Zarejestruj się</Link>
        <h1 className={styles.loginTitle}>Logowanie</h1>
        <p className={styles.loginSubtitle}>Wpisz poniżej swój adres email oraz hasło</p>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Hasło</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className={styles.error}>{error}</p>}
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
