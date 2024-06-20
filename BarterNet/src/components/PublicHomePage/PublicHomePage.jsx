import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contex/AuthProvider";
import { doc, getDoc, collection, getDocs } from "firebase/firestore"; // Updated to include getDocs
import { db } from "../../config/firebase";

import styles from "./PublicHomePage.module.css";
import ListingItem from "../ListingItem/ListingItem.jsx";
import HeroBackground from "./assets/hero-1600-background.webp";

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

  return (
    <div>
      <p>{profileData.firstName}</p>
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
            <button className={styles.button}>Najpopularniejsze oferty</button>
            <button className={styles.button}>Poznaj korzyści barteru</button>
            <button className={styles.button}>Pierwsze kroki</button>
          </div>
        </section>

        {/* Sekcja 3 */}
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
      </div>
    </div>
  );
};

export default PublicHomePage;
