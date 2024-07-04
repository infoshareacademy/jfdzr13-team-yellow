import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contex/AuthProvider";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SelectLocation from "../../utils/SelectComponents/SelectLocation";
import styles from "./AddListing.module.css";
import { ClipLoader } from "react-spinners";
import pica from "pica";
import SelectCategory from "../../utils/SelectComponents/SelectCategory";

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
    foto: [],
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (event) => {
    const selectedFiles = [...event.target.files];
    const resizedFiles = await Promise.all(selectedFiles.map(resizeImage));
    setFiles(resizedFiles);

    const urls = resizedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...urls]);
    console.log(previewUrls)
  };

  const resizeImage = async (file) => {
    const picaResizer = pica();
    const img = new Image();
    const canvas = document.createElement("canvas");
    const maxDimension = 800; // Example max dimension

    return new Promise((resolve, reject) => {
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        const scaleFactor = Math.min(
          maxDimension / img.width,
          maxDimension / img.height
        );
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;

        await picaResizer.resize(img, canvas);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type }));
          } else {
            reject(new Error("Image resizing failed"));
          }
        }, file.type);
      };
      img.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handlePredefinedImageClick = (imageUrl) => {
    setFormData((prevFormData) => {
      const newFoto = (prevFormData.foto || []).includes(imageUrl)
        ? prevFormData.foto.filter((img) => img !== imageUrl)
        : [...(prevFormData.foto || []), imageUrl];
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

      const newListing = {
        ...formData,
        foto: [...(formData.foto || []), ...imageUrls],
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
        foto: [],
      });
      setFiles([]);
      setPreviewUrls([]);
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
  const handleCategoryChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: selectedOption ? selectedOption.value : "",
    }));
  };

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
          <SelectCategory
            placeholder="Wybierz kategorię"
            onChange={handleCategoryChange}
            name="categories"
            value={
              formData.category
                ? { value: formData.category, label: formData.category }
                : null
            }
          />
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
        <fieldset className={styles.addFotoContainer}>
        <label className={styles.addListingLabel}>
          Dodaj djęcia:
          
          <div className={styles.predefinedImagesContainer}>
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.foto.includes("/src/assets/other/image1.png")
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
                formData.foto.includes("/src/assets/other/image2.png")
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
                formData.foto.includes("/src/assets/other/image3.png")
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
                formData.foto.includes("/src/assets/other/image4.png")
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
                formData.foto.includes("/src/assets/other/image5.png")
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
            className={styles.addListingFileInput}
          />
          Wybierz pliki
        </label>
        {previewUrls.length >0 && (
        <div className={styles.previewContainer}>
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Preview ${index + 1}`}
              className={styles.previewImage}
            />
          ))}
        </div>)}
        </fieldset>
        <button
          type="submit"
          disabled={loading}
          className={styles.addListingButton}
        >
          {loading ? (
            <ClipLoader size={20} color={"#ffffff"} />
          ) : (
            "DODAJ OGŁOSZENIE"
          )}
        </button>
      </form>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
}

export default AddListing;
