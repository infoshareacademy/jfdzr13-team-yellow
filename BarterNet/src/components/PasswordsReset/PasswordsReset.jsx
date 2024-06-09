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
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Resetowanie hasła</h1>
        <input
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adres email"
          required
        />
        <button type="submit" className={styles.button}>Zdobądź nowe hasło</button>
      </form>
      {message && <p>{message}</p>}
      <div className={styles.footerLinks}>
        <a href="#" className={styles.link}>Warunki świadczenia usług</a> | <a href="#" className={styles.link}>Polityka prywatności</a>
      </div>
    </div>
  );
};

export default PasswordsReset;
