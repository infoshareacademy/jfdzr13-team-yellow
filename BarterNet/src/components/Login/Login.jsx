import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase';
import styles from './Login.module.css';
import bgImage from './assets/login_background.webp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../Toastify/ToastContainer.jsx'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logowanie udane');
      setTimeout(() => navigate('/UserHomePage'), 3000);
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Logowanie nieudane: ' + error.message);
    }
  };

  return (
    <div className={styles.wrap}>
      <Toast />
      <div className={styles.loginLeft}>
        <img src={bgImage} alt="Background" className={styles.loginImage} />
      </div>
      <section className={styles.loginRight}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>Logowanie</h1>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="example@example.pl" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Hasło</label>
            <input type="password" id="password" placeholder="Wpisz hasło" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Link to="/passwordreset" className={styles.forgotPassword}>Nie pamiętasz hasła?</Link>
          <button type="submit" className={styles.loginButton}>ZALOGUJ</button>
          <Link to="/register" className={styles.registerLink}>Nie masz konta? Zarejestruj się</Link>
        </form>
        <div className={styles.loginFooter}>
          <Link to="/terms" className={styles.footerLink}>Warunki świadczenia usług</Link> | <Link to="/privacy-policy" className={styles.footerLink}>Polityka prywatności</Link>
        </div>
      </div>
      </section>
    </div>
  );
};

export default Login;
