import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db} from "../../config/firebase";
import styles from "./Register.module.css";
import { setDoc, doc } from "firebase/firestore";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    city: "",
    phone: "",
    description: "",
    termsAccepted: false, // Checkbox state
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)
    );
  };

  const validatePhone = (phone) => {
    return /^\d{3}-\d{3}-\d{4}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setError("Musisz zaakceptować warunki świadczenia usług.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Hasła nie są takie same!");
      return;
    }
    if (!validatePassword(formData.password)) {
      setError(
        "Hasło musi zawierać co najmniej 8 znaków, w tym litery i cyfry."
      );
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError("Numer telefonu musi być w formacie XXX-XXX-XXXX.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
   
// Dodanie użytkownika do bazy
  await setDoc(doc(db, "users", user.uid), {
  email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    city: formData.city,
    phone: formData.phone,
    description: formData.description,
    listings: [
      {offer: []},
      {search: []},
      ],
  })

      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      navigate("/UserHomePage");
    } catch (error) {
      console.error("Error in registration: ", error);
      setError("Błąd rejestracji: " + error.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1>Rejestracja</h1>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <input
          type="text"
          name="firstName"
          placeholder="Imię"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nazwisko"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Potwierdź hasło"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Miasto"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefon"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Twój opis"
          value={formData.description}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
          Akceptuję warunki świadczenia usług.
        </label>

        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
}

export default Register;
