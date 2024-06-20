import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contex/AuthProvider";
import { doc, getDoc, collection, getDocs } from "firebase/firestore"; // Updated to include getDocs
import { db } from "../../config/firebase";

import styles from "./PublicHomePage.module.css";
import ListingItem from "../ListingItem/ListingItem.jsx";

import Icon1 from "./assets/Icon1.png";
import Icon2 from "./assets/Icon2.png";
import Icon3 from "./assets/Icon3.png";

const PublicHomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "Resetuj hasło",
    city: "",
    phone: "",
    description: "",
  });

  const [showSection3, setShowSection3] = useState(true);
  const [showSection4, setShowSection4] = useState(false);
  const [showSection5, setShowSection5] = useState(false);
  const [activeButton, setActiveButton] = useState("section3");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Błąd podczas pobierania danych użytkowników.");
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          } else {
            console.log("No such document!");
            setError("Nie znaleziono dokumentu.");
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Błąd podczas pobierania danych.");
        }
        setIsLoading(false);
      };

      fetchData();
    }
  }, [currentUser]);

  if (isLoading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error}</p>;

  // Filter users with at least one offer
  const usersWithOffers = users.filter((user) =>
    user.listings.some((listing) => listing.offer && listing.offer.length > 0)
  );

  // Shuffle the filtered users array and get the first 3 random users
  const shuffledUsers = usersWithOffers.sort(() => 0.5 - Math.random());
  const randomUsers = shuffledUsers.slice(0, 3);

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
              {randomUsers.map((user, index) => (
                <ListingItem
                  key={user.id} // Use a unique identifier as the key
                  title={user.listings[0].offer[0].title}
                  content={user.listings[0].offer[0].description}
                  image={user.listings[0].offer[0].foto[0]}
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
