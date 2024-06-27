import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contex/AuthProvider";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SelectLocation from "../../utils/SelectLocation/SelectLocation";
import styles from "./AddListing.module.css";

function AddListing() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  if (!currentUser) {
    navigate("/login");
  }

  const [listingType, setListingType] = useState("offer");
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    title: "",
    description: "",
    images: [],
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handlePredefinedImageClick = (imageUrl) => {
    setFormData((prevFormData) => {
      const newImages = prevFormData.images.includes(imageUrl)
        ? prevFormData.images.filter((img) => img !== imageUrl)
        : [...prevFormData.images, imageUrl];
      return {
        ...prevFormData,
        images: newImages,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let imageUrls = await Promise.all(
        [...files].map(async (file) => {
          const fileRef = ref(
            storage,
            `images/${currentUser.uid}/${Date.now()}_${file.name}`
          );
          const snapshot = await uploadBytes(fileRef, file);
          return await getDownloadURL(snapshot.ref);
        })
      );

      const newListing = {
        ...formData,
        imageUrls: [...formData.images, ...imageUrls],
        type: listingType,
        userId: currentUser.uid,
      };

      const listingsCollectionRef = collection(
        db,
        "users",
        currentUser.uid,
        "listings"
      );
      await addDoc(listingsCollectionRef, newListing);

      setMessage("Twoje ogłoszenie zostało dodane pomyślnie!");

      setFormData({
        category: "",
        location: "",
        title: "",
        description: "",
        images: [],
      });
      setFiles([]);
      navigate("/myAccount");
    } catch (err) {
      setMessage(`Wystąpił błąd: ${err.message}`);
      console.error("Error adding listing: ", err);
    }
    setLoading(false);
  };

  const handleLocationChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: selectedOption ? selectedOption.value : "",
    }));
  };

  const categoryOptions = [
    "Pomoc domowa",
    "Edukacja",
    "Technologia i IT",
    "Transport i Logistyka",
    "Sport i Rekreacja",
    "Hobby i Rozrywka",
    "Zwierzęta",
    "Zdrowie i Uroda",
    "Inne",
  ];

  return (
    <div className={styles.addListingContainer}>
      <h1 className={styles.header}>Dodaj Ogłoszenie</h1>
      <div className={styles.toggleButtons}>
        <button
          type="button"
          className={`${styles.toggleButton} ${
            listingType === "offer" ? styles.active : ""
          }`}
          onClick={() => setListingType("offer")}
        >
          Oferuję
        </button>
        <button
          type="button"
          className={`${styles.toggleButton} ${
            listingType === "search" ? styles.active : ""
          }`}
          onClick={() => setListingType("search")}
        >
          Potrzebuję
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.addListingForm}>
        <label className={styles.addListingLabel}>
          Kategoria:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={`${styles.addListingInput} ${styles.addListingSelect}`}
          >
            <option value="">Wybierz kategorię</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.addListingLabel}>
          Lokalizacja:
          <SelectLocation
            placeholder="Wybierz miasto lub wpisz 'ZDALNIE'"
            onChange={handleLocationChange}
            name="location"
            value={
              formData.location
                ? { value: formData.location, label: formData.location }
                : null
            }
          />
        </label>
        <label className={styles.addListingLabel}>
          Tytuł:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.addListingInput}
          />
        </label>
        <label className={styles.addListingLabel}>
          Opis:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.addListingTextarea}
          />
        </label>
        <label className={styles.addListingLabel}>
          Zdjęcia:
          <div className={styles.predefinedImages}>
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.images.includes("/src/assets/other/image1.png")
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handlePredefinedImageClick("/src/assets/other/image1.png")
              }
            >
              <img
                src="/src/assets/other/image1.png"
                alt="Image 1"
                className={styles.predefinedImage}
              />
            </button>
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.images.includes("/src/assets/other/image2.png")
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handlePredefinedImageClick("/src/assets/other/image2.png")
              }
            >
              <img
                src="/src/assets/other/image2.png"
                alt="Image 2"
                className={styles.predefinedImage}
              />
            </button>
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.images.includes("/src/assets/other/image3.png")
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handlePredefinedImageClick("/src/assets/other/image3.png")
              }
            >
              <img
                src="/src/assets/other/image3.png"
                alt="Image 3"
                className={styles.predefinedImage}
              />
            </button>
          </div>
        </label>
        <label className={styles.customFileUpload}>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className={styles.addListingFileInput}
          />
          Wybierz pliki
        </label>

        <button
          type="submit"
          disabled={loading}
          className={styles.addListingButton}
        >
          DODAJ OGŁOSZENIE
        </button>
      </form>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
}

export default AddListing;
