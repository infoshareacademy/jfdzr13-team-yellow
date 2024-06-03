import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase'; 
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import styles from './Register.module.css';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        city: '',
        phone: '',
        avatar: null,
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Hasła nie są takie same!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: formData.firstName + ' ' + formData.lastName,
                photoURL: await uploadAvatar(user)
            });

            console.log("User registered and profile updated");
            navigate('/'); 
        } catch (error) {
            console.error("Error in registration: ", error.message);
            alert("Błąd rejestracji: " + error.message);
        }
    };

    const uploadAvatar = async (user) => {
        if (!formData.avatar) return null;
        
        const avatarRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(avatarRef, formData.avatar);
        return getDownloadURL(avatarRef);
    };

    return (
        <div className={styles.registerContainer}>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
            <input type="text" name="firstName" placeholder="Imię" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Nazwisko" value={formData.lastName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Hasło" value={formData.password} onChange={handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Potwierdź hasło" value={formData.confirmPassword} onChange={handleChange} required />
                <input type="text" name="city" placeholder="Miasto" value={formData.city} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} required />
                <input type="file" name="avatar" onChange={handleChange} accept="image/*" />
                <textarea name="description" placeholder="Opis (opcjonalnie)" value={formData.description} onChange={handleChange} />
                <button type="submit">Zarejestruj się</button>
            </form>
        </div>
    );
}

export default Register;