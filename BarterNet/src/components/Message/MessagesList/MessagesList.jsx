import { useState, useEffect } from "react";
import { getMessages } from "../../../utils/messageUtils";
import { useAuth } from "../../../contex/AuthProvider";
import { Link } from "react-router-dom";
import styles from "./MessagesList.module.css";

const MessagesList = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessages(currentUser.uid);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Błąd podczas pobierania wiadomości: ", error);
        setError("Wystąpił błąd podczas pobierania wiadomości.");
      }
      setLoading(false);
    };

    fetchMessages();
  }, [currentUser.uid]);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className={styles.messagesListContainer}>
      <h1 className={styles.messageListHeader}>Twoje wiadomości</h1>
      {messages.length === 0 ? (
        <p>Brak wiadomości.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className={styles.messageItem}>
            <p>
              <strong>Od:</strong>
              <Link to={`/user/${msg.senderId}`} className={styles.senderName}>
                {msg.senderName}
              </Link>
            </p>
            <p>
              <strong>Email:</strong> {msg.recipientEmail}
            </p>
            <p>
              <strong>Wiadomość:</strong> {msg.message}
            </p>
            <p>
              <strong>Data:</strong> {msg.timestamp.toDate().toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MessagesList;
