import { useState } from "react";
import { useAuth } from "../../../contex/AuthProvider";
import { addMessage } from "../../../utils/messageUtils";
import styles from "./MessageForm.module.css";

function MessageForm({ recipientEmail, recipientName, recipientId, adTitle }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    message: adTitle ? `W sprawie ogłoszenia: ${adTitle}\n\n` : "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);

    try {
      await addMessage(
        currentUser.uid,
        `${currentUser.firstName} ${currentUser.lastName}`,
        recipientId,
        recipientEmail,
        formData.message,
        currentUser.email
      );
      setFormStatus("Wiadomość została wysłana pomyślnie!");
      setFormData({
        message: adTitle ? `W sprawie ogłoszenia: ${adTitle}\n\n` : "",
      });
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości: ", error);
      setFormStatus("Wystąpił błąd podczas wysyłania wiadomości.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={styles.messageFormContainer}>
      <h1 className={styles.messageFormHeader}>
        Wyślij wiadomość do {recipientName}
      </h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.messageFormLabel}>Wiadomość:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className={styles.messageFormTextarea}
        />

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.messageFormButton}
            disabled={isSending}
          >
            {isSending ? "Wysyłanie..." : "WYŚLIJ WIADOMOŚĆ"}
          </button>
        </div>
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
