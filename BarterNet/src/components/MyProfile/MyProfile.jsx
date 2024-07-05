import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contex/AuthProvider";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import styles from './MyProfile.module.css';

function MyProfile() {
    const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');
    const navigate = useNavigate();

  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: 'Resetuj hasło',
    city: '',
    phone: '',
    description: ''
  });


  const handleEdit = () => {
    navigate('/myProfile/edit');
  };

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          } else {
            console.log('No such document!');
            setError('Nie znaleziono dokumentu.');
          }
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Błąd podczas pobierania danych.');
        }
        setIsLoading(false);
      };
  
      fetchData();
    }
  }, [currentUser]);

  if (isLoading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error}</p>;

  return (
    <div className={styles.profileContainer}>
    <h1 className={styles.header}>Mój profil</h1>
    <div className={styles.profileDetails}>
      <div className={styles.avatar}>
        <img src={profileData.avatarUrl || '/path/to/default/avatar.png'} alt="Avatar" />
      </div>
      <div className={styles.details}>
        <p><span className={styles.label}>Imię:</span> {profileData.firstName}</p>
        <p><span className={styles.label}>Nazwisko:</span> {profileData.lastName}</p>
        <p><span className={styles.label}>Email:</span> {profileData.email}</p>
        <p><span className={styles.label}>Hasło:</span> *********</p>
        <p><span className={styles.label}>Miejscowość:</span> {profileData.city}</p>
        <p><span className={styles.label}>Telefon:</span> {profileData.phone}</p>
        <p><span className={styles.label}>Opis:</span> {profileData.description}</p>
      </div>
    </div>
    <button onClick={handleEdit} className={styles.editButton}>EDYTUJ PROFIL</button>
  </div>
  )
}

export default MyProfile;