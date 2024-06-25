import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import styles from './SingleAd.module.css';

function SingleAd() {
  const { adId } = useParams();
  const [adDetails, setAdDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const docRef = doc(db, "ads", adId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAdDetails(docSnap.data());
        } else {
          setError('No such ad found.');
        }
      } catch (err) {
        setError('Error fetching ad details.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchAd();
  }, [adId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.singleAdContainer}>
      <div className={styles.generalInfo}>
        <h2>{adDetails.title}</h2>
        <p>Kategoria: {adDetails.category}</p>
        <p>Lokalizacja: {adDetails.location}</p>
      </div>
      <div className={styles.detailedInfo}>
        <p>{adDetails.description}</p>
        {/* Assuming images is an array of URLs */}
        {adDetails.images && adDetails.images.map(url => <img src={url} alt="Ad" key={url} />)}
      </div>
      <div className={styles.userInfo}>
        <p>{adDetails.userName}</p>
        <p>{adDetails.userEmail}</p>
        <p>{adDetails.userPhone}</p>
        <p>{adDetails.userDescription}</p>
      </div>
      <button className={styles.exchangeButton}>Wymień się</button>
    </div>
  );
}

export default SingleAd;
