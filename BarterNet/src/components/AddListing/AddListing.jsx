import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import pica from "pica";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { db, storage } from "../../config/firebase";
import { useAuth } from "../../contex/AuthProvider";
import SelectCategory from "../../utils/SelectComponents/SelectCategory";
import SelectLocation from "../../utils/SelectComponents/SelectLocation";
import Toast from "../Toastify/ToastContainer";
import styles from "./AddListing.module.css";
import Image1 from "../../assets/other/image1.png";
import Image2 from "../../assets/other/image2.png";
import Image3 from "../../assets/other/image3.png";
import Image4 from "../../assets/other/image4.png";
import Image5 from "../../assets/other/image5.png";

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
    
    const totalFiles = files.length + formData.foto.length + resizedFiles.length;
    if (totalFiles > 3) {
        toast.error("Możesz dodać maksymalnie 3 zdjęcia");
        return;
    }

    setFiles((prevFiles) => [...prevFiles, ...resizedFiles]);

    const urls = resizedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...urls]);
};

  
  const handleDeleteFile = (indexToRemove) => {
    const newFiles = [...files];
    newFiles.splice(indexToRemove, 1);
    setFiles(newFiles);
  
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(indexToRemove, 1);
    setPreviewUrls(newPreviewUrls);
  };
  // 
  
  const resizeImage = async (file) => {
    const picaResizer = pica();
    const img = new Image();
    const canvas = document.createElement("canvas");
    const maxDimension = 800;

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
  const isSelected = formData.foto.includes(imageUrl);
  const newFoto = isSelected
      ? formData.foto.filter((img) => img !== imageUrl)
      : [...formData.foto, imageUrl];

  if (newFoto.length + files.length > 3) {
      toast.error("Możesz dodać maksymalnie 3 zdjęcia");
      return;
  }

  setFormData((prevFormData) => ({
      ...prevFormData,
      foto: newFoto,
  }));
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
        const limitedFiles = files.slice(0, 3 - formData.foto.length);

        let imageUrls = await Promise.all(
            limitedFiles.map(async (file) => {
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
            foto: [...formData.foto, ...imageUrls],
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

        toast.success("Ogłoszenie zostało dodane");
        setTimeout(() => navigate("/"), 2000);
    } catch (err) {
        console.error("Error adding listing: ", err);
        setError("Failed to add listing. Please try again.");
    } finally {
        setLoading(false);
    }
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
       <Toast/>
      <h1 className={styles.header}>Dodaj Ogłoszenie</h1>
      <div className={styles.toggleButtons}>
        <button
          type="button"
          className={`${styles.toggleButton} ${
            listingType === "offer" ? styles.active : ""
          }`}
          onClick={() => setListingType("offer")}
        >
          OFERUJĘ
        </button>
        <button
          type="button"
          className={`${styles.toggleButton} ${
            listingType === "search" ? styles.active : ""
          }`}
          onClick={() => setListingType("search")}
        >
          POTRZEBUJĘ
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
            placeholder="Wpisz tytuł (max 32 znaki)"
            maxLength={32}
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
          Wybierz grafikę:
          
          <div className={styles.predefinedImagesContainer}>
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.foto.includes(Image1)
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handlePredefinedImageClick(Image1)
              }
            >
              <img
                src={Image1}
                alt="Image 1"
                className={styles.predefinedImage}
              />
            </button>
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.foto.includes(Image2)
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handlePredefinedImageClick(Image2)
              }
            >
              <img
                src={Image2}
                alt="Image 2"
                className={styles.predefinedImage}
              />
            </button>
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.foto.includes(Image3)
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handlePredefinedImageClick(Image3)
              }
            >
              <img
                src={Image3}
                alt="Image 3"
                className={styles.predefinedImage}
              />
            </button>
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.foto.includes(Image4)
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handlePredefinedImageClick(Image4)
              }
            >
              <img
                src={Image4}
                alt="Image 4"
                className={styles.predefinedImage}
              />
            </button>
            <button
              type="button"
              className={`${styles.imageOption} ${
                formData.foto.includes(Image5)
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handlePredefinedImageClick(Image5)
              }
            >
              <img
                src={Image5}
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
          lub dodaj własne zdjęcia
        </label>
        {previewUrls.length >0 && (
        <div className={styles.previewContainer}>
          {previewUrls.map((url, index) => (
            <div key={index}>
            <img
              key={index}
              src={url}
              alt={`Preview ${index + 1}`}
              className={styles.previewImage}
            />
            <button type='button' onClick={() => handleDeleteFile(index)}/>
            </div>
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
