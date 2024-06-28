import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { db } from "../../config/firebase";
import styles from "./PublicHomePage.module.css";
import ListingItem from "../ListingItem/ListingItem.jsx";

import NoImage from "./assets/no-image.png";
import Icon1 from "./assets/Icon1.png";
import Icon2 from "./assets/Icon2.png";
import Icon3 from "./assets/Icon3.png";

// Function to fetch random listings from Firebase
const fetchRandomListings = async (numListings) => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);
  let allListings = [];

  for (const userDoc of usersSnapshot.docs) {
    const listingsCollection = collection(db, `users/${userDoc.id}/listings`);
    const listingsSnapshot = await getDocs(listingsCollection);

    listingsSnapshot.forEach((listingDoc) => {
      allListings.push(listingDoc.data());
    });
  }

  let randomListings = [];
  while (randomListings.length < numListings && allListings.length > 0) {
    const randomIndex = Math.floor(Math.random() * allListings.length);
    randomListings.push(allListings.splice(randomIndex, 1)[0]);
  }

  return randomListings;
};

// Main App component
const PublicHomePage = () => {
  const [showSection3, setShowSection3] = useState(true);
  const [showSection4, setShowSection4] = useState(false);
  const [showSection5, setShowSection5] = useState(false);
  const [activeButton, setActiveButton] = useState("section3");

  const toggleSection3 = () => {
    setShowSection3(true);
    setShowSection4(false);
    setShowSection5(false);
    setActiveButton("section3");
  };

  const toggleSection4 = () => {
    setShowSection3(false);
    setShowSection4(true);
    setShowSection5(false);
    setActiveButton("section4");
  };

  const toggleSection5 = () => {
    setShowSection3(false);
    setShowSection4(false);
    setShowSection5(true);
    setActiveButton("section5");
  };
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getRandomListings = async () => {
      const randomListings = await fetchRandomListings(3);
      setListings(randomListings);
    };

    getRandomListings();
  }, []);

  if (listings.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.site}>
        <section className={styles.hero}>
          <div className={styles.heroButtonContainer}>
            <h1>Wymień się!</h1>
            <p>
              Znajdź najlepsze oferty i wymieniaj się usługami, na te, których
              potrzebujesz. Dołącz do nas i zacznij korzystać z możliwości,
              jakie daje nowoczesny barter.
            </p>
            <div className={styles.heroButtonWrapper}>
              <div>
                <a href="/login">
                  <button className={styles.heroButton}>Zacznij teraz</button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Sekcja 2 */}
        <section className={styles.buttonsSection}>
          <div className={styles.buttonscontainer}>
            <button
              className={`${styles.button} ${
                activeButton === "section3" ? styles.active : ""
              }`}
              onClick={toggleSection3}
            >
              Najpopularniejsze oferty
            </button>
            <button
              className={`${styles.button} ${
                activeButton === "section4" ? styles.active : ""
              }`}
              onClick={toggleSection4}
            >
              Poznaj korzyści barteru
            </button>
            <button
              className={`${styles.button} ${
                activeButton === "section5" ? styles.active : ""
              }`}
              onClick={toggleSection5}
            >
              Pierwsze kroki
            </button>
          </div>
        </section>
        {/* Sekcja 3 */}

        {showSection3 && (
          <section className={styles.gridSection}>
            <div className={styles.gridContainer}>
              {listings.map((listing, index) => (
                <ListingItem
                  key={listing.id || index} // Use a unique identifier as the key
                  title={listing.title}
                  content={listing.description}
                  image={
                    listing.foto && listing.foto.length > 0
                      ? listing.foto[0]
                      : NoImage
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* Sekcja 4 */}
        {showSection4 && (
          <section className={styles.gridSection}>
            <div className={styles.gridContainer2}>
              <div className={styles.article__container}>
                <h2>Oszczędzaj pieniądze</h2>
                <p>
                  Brak konieczności wydawania gotówki pozwala na realizację
                  potrzeb bez angażowania środków finansowych.
                </p>
              </div>
              <div className={styles.article__container}>
                <h2>Buduj relacje</h2>
                <p>
                  Barter sprzyja nawiązywaniu trwałych i wartościowych relacji
                  między stronami wymiany. Sprawdź jak to działa.
                </p>
              </div>
              <div className={styles.article__container}>
                <h2>Ciesz się różnorodnością</h2>
                <p>
                  Wymieniaj różnorodne usługi, dostosowując warunki wymiany
                  barterowej do swoich indywidualnych potrzeb.
                </p>
              </div>
              <div className={styles.article__container}>
                <h2>Optymalnie wykorzystuj zasoby</h2>
                <p>
                  Wymieniaj nadmiarowe zasoby i umiejętności na te, których
                  potrzebujesz, zwiększając efektywność.
                </p>
              </div>
            </div>
          </section>
        )}
        {/* Sekcja 5 */}
        {showSection5 && (
          <section className={styles.gridSection}>
            <div className={styles.gridContainer}>
              <div className={styles.article__container}>
                <img src={Icon1} alt="" />
                <h2>Zarejestruj się</h2>
                <p>
                  Pierwszym krokiem jest założenie konta w Barternet. Wystarczy
                  wypełnić formularz rejestracyjny, podając swoje podstawowe
                  dane oraz adres e-mail.
                </p>
              </div>
              <div className={styles.article__container}>
                <img src={Icon2} alt="" />
                <h2>Dodaj ogłoszenie</h2>
                <p>
                  Dodawaj ogłoszenia i opisuj swoje usługi. Pamiętaj, aby
                  szczegółowo opisać swoją ofertę i dodać zdjęcia, co pozwoli
                  szybko znaleźć ofertę do wymiany
                </p>
              </div>
              <div className={styles.article__container}>
                <img src={Icon3} alt="" />
                <h2>Wymień się</h2>
                <p>
                  To proste - gdy znajdziesz odpowiednie ogłoszenie, będziesz
                  mógł skontaktować się innym uzytkownikiem i wymienić swoje
                  usługi.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PublicHomePage;
