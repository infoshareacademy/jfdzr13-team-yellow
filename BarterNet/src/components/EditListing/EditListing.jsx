import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contex/AuthProvider";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SelectLocation from "../../utils/SelectComponents/SelectLocation.jsx";
import styles from "./EditListing.module.css";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../Toastify/ToastContainer.jsx";

function EditListing() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    category: "",
    location: "",
    title: "",
    description: "",
    foto: [],
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        console.log(`Fetching listing for ID: ${id}`);
        const docRef = doc(db, "users", currentUser.uid, "listings", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          setError("Document does not exist.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching document:", err);
      }
    };

    fetchData();
  }, [currentUser, id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const selectedFiles = [...event.target.files];
    setFiles(selectedFiles);

    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    if (previewUrls.length <3) { 
      setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...urls]);
    } else {
      toast.error("Możesz dodać maksymalnie 3 zdjęcia", { duration: 3000});
    }
  };

  const handleDeleteFile = (indexToRemove) => {
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(indexToRemove, 1);
    setPreviewUrls(newPreviewUrls);
  };

  //   const urls = selectedFiles.map((file) => URL.createObjectURL(file));
  //   setPreviewUrls(urls);
  // };

  const handlePredefinedImageClick = (imageUrl) => {
    setFormData((prevFormData) => {
      const newFoto = prevFormData.foto.includes(imageUrl)
        ? prevFormData.foto.filter((img) => img !== imageUrl)
        : [...prevFormData.foto, imageUrl];
      return {
        ...prevFormData,
        foto: newFoto,
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

      const updatedListing = {
        ...formData,
        foto: [...formData.foto, ...imageUrls],
      };

      const docRef = doc(db, "users", currentUser.uid, "listings", id);
      await updateDoc(docRef, updatedListing);

      setMessage("Ogłoszenie zostało zaktualizowane pomyślnie!");
      toast.success("Ogłoszenie zostało zaktualizowane pomyślnie!");
      navigate("/myAccount");
    } catch (err) {
      setMessage(`Wystąpił błąd: ${err.message}`);
      toast.error(`Wystąpił błąd: ${err.message}`);
      console.error("Error updating listing:", err);
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
    <div className={styles.editListingContainer}>
      <Toast/>
      <h1 className={styles.header}>Edytuj Ogłoszenie</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.editListingForm}>
        <label className={styles.editListingLabel}>
          Kategoria:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={`${styles.editListingInput} ${styles.editListingSelect}`}
          >
            <option value="">Wybierz kategorię</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.editListingLabel}>
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
        <label className={styles.editListingLabel}>
          Tytuł:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.editListingInput}
          />
        </label>
        <label className={styles.editListingLabel}>
          Opis:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.editListingTextarea}
          />
        </label>
        <label className={styles.editListingLabel}>
          Wybierz grafikę:
          <div className={styles.predefinedImages}>
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.foto && formData.foto.includes("/src/assets/other/image1.png")
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
                formData.foto && formData.foto.includes("/src/assets/other/image2.png")
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
                formData.foto && formData.foto.includes("/src/assets/other/image3.png")
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
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.foto && formData.foto.includes("/src/assets/other/image4.png")
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handlePredefinedImageClick("/src/assets/other/image4.png")
              }
            >
              <img
                src="/src/assets/other/image4.png"
                alt="Image 4"
                className={styles.predefinedImage}
              />
            </button>
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.foto && formData.foto.includes("/src/assets/other/image5.png")
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handlePredefinedImageClick("/src/assets/other/image5.png")
              }
            >
              <img
                src="/src/assets/other/image5.png"
                alt="Image 5"
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
            className={styles.editListingFileInput}
          />
          lub dodaj własne zdjęcia
        </label>
        <div className={styles.previewContainer}>
          {previewUrls.map((url, index) => (
            <div key={index}>
            <img
              key={index}
              src={url}
              alt={`Preview ${index + 1}`}
              className={styles.previewImage}
            />
            <button type='button' onClick={() => handleDeleteFile(index)}>usuń</button>
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={styles.editListingButton}
        >
          {loading ? <ClipLoader size={20} color={"#ffffff"} /> : "ZAKTUALIZUJ OGŁOSZENIE"}
        </button>
      </form>
      {message && <div className={styles.message}>{message}</div>}
      {/* <Toast/> */}
    </div>
  );
}

export default EditListing;
