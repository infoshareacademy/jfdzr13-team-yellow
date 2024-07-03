import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc, collection, query, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import MessageForm from "../Message/MessageForm/MessageForm";
import styles from "./OtherUserPage.module.css";

const OtherUserPage = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [userAds, setUserAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        } else {
          setError("Nie znaleziono użytkownika.");
        }

        const adsQuery = query(collection(db, "users", userId, "listings"));
        const adsSnapshot = await getDocs(adsQuery);
        const adsList = adsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserAds(adsList);
      } catch (err) {
        setError("Błąd podczas pobierania danych użytkownika.");
        console.error(err);
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;

  const handleExchangeClick = (ad) => {
    setSelectedAd(ad);
    setShowMessageForm(true);
  };

  return (
    <div className={styles.userPageContainer}>
      <div className={styles.userInfo}>
        <img src={userDetails.avatarUrl} alt="Avatar" className={styles.avatar} />
        <div>
          <h1>{`${userDetails.firstName} ${userDetails.lastName}`}</h1>
          <p>{userDetails.description}</p>
        </div>
      </div>
      <h2>Ogłoszenia użytkownika</h2>
      <div className={styles.adsContainer}>
        {userAds.map(ad => (
          <div key={ad.id} className={styles.adItem}>
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
            <button 
              className={styles.exchangeButton} 
              onClick={() => handleExchangeClick(ad)}
            >
              WYMIEŃ SIĘ
            </button>
          </div>
        ))}
      </div>
      {showMessageForm && (
        <MessageForm
          recipientEmail={userDetails.email}
          recipientName={`${userDetails.firstName} ${userDetails.lastName}`}
          recipientId={userId}
          adTitle={selectedAd.title}
        />
      )}
    </div>
  );
};

export default OtherUserPage;
