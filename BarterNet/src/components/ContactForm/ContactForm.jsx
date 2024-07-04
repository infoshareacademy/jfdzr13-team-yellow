import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.email) {
      tempErrors["email"] = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors["email"] = "Email is not valid";
      isValid = false;
    }

    if (!formData.message) {
      tempErrors["message"] = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      emailjs.sendForm('service_yellow', 'template_yj9mnxb', e.target, 'K0aAUIQ0dk0YO_ZyO')
        .then((result) => {
          console.log(result.text);
          alert('Wiadomość została wysłana!');
        }, (error) => {
          console.log(error.text);
          alert('Wystąpił błąd podczas wysyłania wiadomości.');
        });

      // Reset formularza po wysłaniu
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactInfo}>
        <h1 className={styles.header}>Kontakt</h1>
        <div className={styles.owners}>
          <h3>Nasze dane:</h3>
          <p>Właścicielem serwisu jest:</p>
          <p>YELLOW TEAM:<br/> Joasia | Magda | Sebastian | Sylwia</p>
        </div>
        <div className={styles.logoContainer}>
          <img src="src/components/ContactForm/assets/logo2.png" alt="Logo" className={styles.logo} />
        </div>
        <p>&copy; 2024 by YELLOW TEAM</p>
      </div>
      <div className={styles.contactForm}>
        <h2>Wyślij nam wiadomość:</h2>
        <p>Zadaj pytanie już teraz. Skontaktuj się za pomocą formularza:</p>
        <form 
        className={styles.form}
        onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Imię i nazwisko:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Twoje imię i nazwisko"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.pl"
              required
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Temat:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Temat Twojej wiadomości"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Wiadomość:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Treść Twojej wiadomości"
              required
            />
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>WYŚLIJ WIADOMOŚĆ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
