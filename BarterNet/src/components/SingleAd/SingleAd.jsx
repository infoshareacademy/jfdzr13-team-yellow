import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAdDetails, deleteAd } from "../../utils/firebaseUtils";
import MessageForm from "../MessageForm/MessageForm";
import { useAuth } from "../../contex/AuthProvider";
import styles from "./SingleAd.module.css";

function SingleAd() {
  const { userId, adId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [adDetails, setAdDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleEditClick = () => {
    navigate(`/editListing/${adId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteAd(userId, adId);
      navigate("/myAds");
    } catch (err) {
      setError("Błąd podczas usuwania ogłoszenia.");
      console.error(err);
    }
  };

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;

  const isOwner = currentUser && currentUser.uid === userId;

  return (
    <div className={styles.singleAdContainer}>
      <div className={styles.generalInfo}>
        <div className={styles.header}>
          <h1 className={styles.title}>{adDetails.title}</h1>
          <div className={styles.adMeta}>
            <p>Kategoria: {adDetails.category}</p>
            <p>Lokalizacja: {adDetails.location}</p>
          </div>
        </div>
      </div>
      <div className={styles.adContent}>
        <div className={styles.adImageContainer}>
          {adDetails.foto && adDetails.foto.length > 0 && (
            <img src={adDetails.foto[0]} alt="Ad" className={styles.adImage} />
          )}
        </div>
        <div className={styles.description}>
          <p>{adDetails.description}</p>
        </div>
      </div>
      {currentUser && currentUser.uid === userId ? (
        <div className={styles.userActions}>
          <button onClick={handleEditClick} className={styles.editButton}>
            EDYTUJ
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className={styles.deleteButton}
          >
            USUŃ
          </button>
          {showDeleteModal && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <p>Czy na pewno chcesz usunąć to ogłoszenie?</p>
                <button onClick={handleDelete} className={styles.confirmButton}>
                  TAK
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={styles.cancelButton}
                >
                  NIE
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.userInfo}>
          <img
            src={userDetails.avatarUrl}
            alt="Avatar"
            className={styles.avatar}
          />
          <Link to={`/user/${userId}`} className={styles.userName}>
            {userDetails.firstName} {userDetails.lastName}
          </Link>
          <button
            onClick={() => setShowMessageForm(true)}
            className={styles.exchangeButton}
          >
            WYMIEŃ SIĘ
          </button>
        </div>
      )}
      {showMessageForm && (
        <MessageForm
          recipientEmail={userDetails.email}
          recipientName={`${userDetails.firstName} ${userDetails.lastName}`}
        />
      )}
    </div>
  );
}
export default SingleAd;
