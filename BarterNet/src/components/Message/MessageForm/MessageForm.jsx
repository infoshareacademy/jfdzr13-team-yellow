import { useState } from "react";
import { useAuth } from "../../../contex/AuthProvider";
import { addMessage } from "../../../utils/messageUtils";
import styles from "./MessageForm.module.css";

function MessageForm({ recipientEmail, recipientName, recipientId }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser.firstName || !currentUser.lastName) {
      setFormStatus(
        "Nie można wysłać wiadomości: brak imienia lub nazwiska użytkownika."
      );
      return;
    }

    try {
      await addMessage(
        currentUser.uid,
        `${currentUser.firstName} ${currentUser.lastName}`,
        recipientId,
        recipientEmail,
        formData.message
      );
      setFormStatus("Wiadomość została wysłana pomyślnie!");
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości: ", error);
      setFormStatus("Wystąpił błąd podczas wysyłania wiadomości.");
    }
  };

  return (
    <div className={styles.messageFormContainer}>
      <h1 className={styles.messageFormHeader}>
        Wyślij wiadomość do {recipientName}
      </h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.messageFormLabel}>Imię i nazwisko:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.messageFormInput}
        />

        <label className={styles.messageFormLabel}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.messageFormInput}
        />

        <label className={styles.messageFormLabel}>Wiadomość:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className={styles.messageFormTextarea}
        />

        <button type="submit" className={styles.messageFormButton}>
          WYŚLIJ WIADOMOŚĆ
        </button>
      </form>
      {formStatus && (
        <div
          className={
            formStatus.includes("pomyślnie")
              ? styles.messageSuccess
              : styles.messageError
          }
        >
          {formStatus}
        </div>
      )}
    </div>
  );
}

export default MessageForm;
