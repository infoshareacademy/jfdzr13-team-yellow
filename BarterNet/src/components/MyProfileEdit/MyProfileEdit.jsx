import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contex/AuthProvider";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from './MyProfileEdit.module.css';

function MyProfileEdit() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        phone: '',
        avatarUrl: '',
        description: ''
    });


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            const docRef = doc(db, 'users', currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFormData(docSnap.data());
            } else {
                console.log('No such document!');
            }
        };
        fetchData();
    }, [currentUser, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateEmail = email => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const validatePhone = phone => /^\d{3}-\d{3}-\d{3}$/.test(phone);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!validatePhone(formData.phone)) {
            setError('Phone number must be in format XXX-XXX-XXX.');
            return;
        }

        setLoading(true);
        try {
            const docRef = doc(db, 'users', currentUser.uid);
            await updateDoc(docRef, formData);
            navigate('/myProfile');
        } catch (error) {
            console.error('Error updating profile: ', error);
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.editContainer}>
            <h1 className={styles.header}>Edycja profilu</h1>
            <form onSubmit={handleSubmit} className={styles.editForm}>
                {Object.keys(formData).map((key) => (
                    key !== 'description' ?
                    <label key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                        <input
                            type={key === 'email' ? 'email' : 'text'}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                        />
                    </label> :
                    <label key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                        <textarea
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                        />
                    </label>
                ))}
                <button type="submit" className={styles.saveButton} disabled={loading}>Zapisz</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default MyProfileEdit;
