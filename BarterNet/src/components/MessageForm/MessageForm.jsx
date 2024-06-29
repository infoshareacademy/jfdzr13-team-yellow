import { useState } from "react";
import emailjs from "emailjs-com";
import styles from "./MessageForm.module.css";

const MessageForm = ({ recipientEmail, recipientName }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.email) {
      tempErrors["email"] = "Email jest wymagany";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors["email"] = "Email jest nieprawidłowy";
      isValid = false;
    }

    if (!formData.message) {
      tempErrors["message"] = "Wiadomość jest wymagana";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const templateParams = {
        to_name: recipientName,
        to_email: recipientEmail,
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      emailjs
        .send(
          "service_yellow", // Replace with your EmailJS service ID
          "template_yj9mnxb", // Replace with your EmailJS template ID
          templateParams,
          "K0aAUIQ0dk0YO_ZyO" // Replace with your EmailJS user ID
        )
        .then(
          (result) => {
            console.log(result.text);
            setSuccessMessage("Wiadomość została wysłana!");
          },
          (error) => {
            console.log(error.text);
            alert("Wystąpił błąd podczas wysyłania wiadomości.");
          }
        );

      // Reset formularza po wysłaniu
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setErrors({});
    }
  };

  return (
    <div className={styles.messageFormContainer}>
      <h2>Wyślij wiadomość do {recipientName}</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="message">Wiadomość:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Treść Twojej wiadomości"
            required
          />
          {errors.message && (
            <span className={styles.error}>{errors.message}</span>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Wyślij wiadomość
          </button>
        </div>
      </form>
      {successMessage && <div className={styles.success}>{successMessage}</div>}
    </div>
  );
};

export default MessageForm;
