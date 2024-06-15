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
        <div className={styles.profileDetalis}>
        <div className={styles.avatar}>
        <img src={profileData.avatarUrl || '/path/to/default/avatar.png'} alt="Avatar" />
        </div>

        <div className={styles.detalis}>
            <p>Imię: {profileData.firstName}</p>
            <p>Nazwisko: {profileData.lastName}</p>
            <p>Email: {profileData.email}</p>
            <p>Hasło: *********</p> 
            <p>Miejscowość: {profileData.city}</p>
            <p>Telefon: {profileData.phone}</p>
            <p>Opis: {profileData.description}</p>

        </div>
        </div>

        <button  onClick={handleEdit} className={styles.editButton}>Edytuj profil</button>
    </div>
  )
}

export default MyProfile;