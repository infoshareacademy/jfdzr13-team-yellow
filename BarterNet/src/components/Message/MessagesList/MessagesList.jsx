import { useState, useEffect } from "react";
import { getMessages, markMessageAsRead } from "../../../utils/messageUtils";
import { useAuth } from "../../../contex/AuthProvider";
import { Link } from "react-router-dom";
import styles from "./MessagesList.module.css";

const MessagesList = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessages(currentUser.uid);
        const sortedMessages = fetchedMessages.sort(
          (a, b) => b.timestamp - a.timestamp
        );
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Błąd podczas pobierania wiadomości: ", error);
        setError("Wystąpił błąd podczas pobierania wiadomości.");
      }
      setLoading(false);
    };

    fetchMessages();
  }, [currentUser.uid]);

  const handleMarkAsRead = async (messageId) => {
    try {
      await markMessageAsRead(currentUser.uid, messageId);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      );
    } catch (error) {
      console.error(
        "Błąd podczas oznaczania wiadomości jako przeczytanej: ",
        error
      );
    }
  };

  const filteredMessages =
    filter === "unread" ? messages.filter((msg) => !msg.isRead) : messages;

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className={styles.messagesListContainer}>
      <h1 className={styles.messageListHeader}>Twoje wiadomości</h1>
      <div className={styles.filterButtons}>
        <button
          className={filter === "all" ? styles.activeFilterButton : ""}
          onClick={() => setFilter("all")}
        >
          Wszystkie
        </button>
        <button
          className={filter === "unread" ? styles.activeFilterButton : ""}
          onClick={() => setFilter("unread")}
        >
          Nieprzeczytane
        </button>
      </div>

      {filteredMessages.length === 0 ? (
        <p>Brak wiadomości.</p>
      ) : (
        filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageItem} ${
              !msg.isRead ? styles.unreadMessage : ""
            }`}
            onClick={() => handleMarkAsRead(msg.id)}
          >
            <p>
              <strong>Od:</strong>
              <Link to={`/user/${msg.senderId}`} className={styles.senderName}>
                {msg.senderName}
              </Link>
            </p>
            <p>
              <strong>Email:</strong> {msg.senderEmail}
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
