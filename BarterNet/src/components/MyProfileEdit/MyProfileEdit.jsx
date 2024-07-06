import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contex/AuthProvider";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./MyProfileEdit.module.css";

function MyProfileEdit() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
    avatarUrl: "",
    description: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchData();
  }, [currentUser, navigate]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "avatar") {
      const file = files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const validatePhone = (phone) => /^\d{3}-\d{3}-\d{3}$/.test(phone);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(formData.email)) {
      setError("Proszę podać poprawny adres email.");
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError("Numer telefonu musi mieć format XXX-XXX-XXX.");
      return;
    }

    setLoading(true);

    try {
      let avatarUrl = formData.avatarUrl;
      if (avatar) {
        const avatarRef = ref(
          storage,
          `avatars/${currentUser.uid}/${avatar.name}`
        );
        const snapshot = await uploadBytes(avatarRef, avatar);
        avatarUrl = await getDownloadURL(snapshot.ref);
      }

      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, { ...formData, avatarUrl });

      navigate("/myProfile");
    } catch (error) {
      console.error("Error updating profile: ", error);
      setError("Nie udało się zaktualizować profilu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.editContainer}>
      <h1 className={styles.header}>Edycja profilu</h1>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <label>
          Imię:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nazwisko:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Miasto:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Telefon:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Zdjęcie:
          <span className={styles.editProfileFileInput}>
            Wybierz plik
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
            />
          </span>
        </label>
        {avatarPreview && (
          <div className={styles.avatarPreview}>
            <img src={avatarPreview} alt="Avatar Preview" />
          </div>
        )}
        <label>
          Opis:
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={styles.saveButton} disabled={loading}>
          ZAPISZ
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default MyProfileEdit;
