import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import styles from './PasswordsReset.module.css';

const PasswordsReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Link do resetowania hasła został wysłany.');
    } catch (error) {
      setMessage('Błąd: ' + error.message);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.loginRight}>
        <div className={styles.loginContainer}>
          <h1 className={styles.loginTitle}>Resetowanie hasła</h1>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Adres email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adres email"
                required
              />
            </div>
            <button type="submit" className={styles.loginButton}>ZDOBĄDŹ NOWE HASŁO</button>
          </form>
          {message && <p>{message}</p>}
          <div className={styles.footerLinks}>
            <a href="/terms" className={styles.link}>Warunki świadczenia usług</a> | <a href="/privacy-policy" className={styles.link}>Polityka prywatności</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordsReset;