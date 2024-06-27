import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdDetails } from "../../utils/firebaseUtils";
import styles from "./SingleAd.module.css";

function SingleAd() {
  const { userId, adId } = useParams();
  const [adDetails, setAdDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdAndUser = async () => {
      try {
        const { adDetails, userDetails } = await getAdDetails(userId, adId);
        setAdDetails(adDetails);
        setUserDetails(userDetails);
      } catch (err) {
        setError("Błąd podczas pobierania szczegółów ogłoszenia.");
        console.error(err);
      }
      setLoading(false);
    };

    fetchAdAndUser();
  }, [userId, adId]);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className={styles.singleAdContainer}>
      <div className={styles.generalInfo}>
        <h1>{adDetails.title}</h1>
        <div className={styles.adInfo}>
          <p>Kategoria: {adDetails.category}</p>
          <p>Lokalizacja: {adDetails.location}</p>
        </div>
      </div>
      <div className={styles.adContent}>
        {adDetails.imageUrls && adDetails.imageUrls.length > 0 && (
          <img
            src={adDetails.imageUrls[0]}
            alt="Ad"
            className={styles.adImage}
          />
        )}
        <div className={styles.description}>
          <p>{adDetails.description}</p>
        </div>
      </div>
      <div className={styles.userInfo}>
        <img
          src={userDetails.avatarUrl}
          alt="Avatar"
          className={styles.avatar}
        />
        <p>
          {userDetails.firstName} {userDetails.lastName}
        </p>
        <button className={styles.exchangeButton}>Wymień się</button>
      </div>
    </div>
  );
}

export default SingleAd;
