import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { useAuth } from "../../contex/AuthProvider";
import Content from "../Content/Content.component";
import MyListingItem from "../MyListingItem/MyListingItem";
import styles from "./MyAds.module.css";
import NoImage from "./assets/no-image.png";

const MyAds = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [offerListings, setOfferListings] = useState([]);
  const [searchListings, setSearchListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (currentUser) {
          const listingsRef = collection(
            db,
            `users/${currentUser.uid}/listings`
          );
          const listingsSnapshot = await getDocs(listingsRef);

          if (listingsSnapshot.empty) {
            console.log("No matching documents.");
            setOfferListings([]);
            setSearchListings([]);
          } else {
            const listingsData = listingsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            const offerListingsData = listingsData.filter(
              (listing) => listing.type === "offer"
            );
            const searchListingsData = listingsData.filter(
              (listing) => listing.type === "search"
            );

            setOfferListings(offerListingsData);
            setSearchListings(searchListingsData);
          }
        }
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to fetch listings.");
      }

      setIsLoading(false);
    };

    fetchListings();
  }, [currentUser]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Content>
      <h1 className={styles.header}>Moje ogłoszenia</h1>
      <section className={styles.gridSection}>
        <h2>Oferuję</h2>
        <div className={styles.gridContainer}>
          {offerListings.map((listing) => (
            <div key={listing.id}>
              <MyListingItem
                title={listing.title}
                content={listing.description}
                image={
                  listing.foto && listing.foto.length > 0
                    ? listing.foto[0]
                    : NoImage
                }
                userId={currentUser.uid}
                listingId={listing.id}
              />
            </div>
          ))}
        </div>
      </section>
      <section className={styles.gridSection}>
        <h2>Szukam</h2>
        <div className={styles.gridContainer}>
          {searchListings.length > 0 ? (
            searchListings.map((listing) => (
              <div key={listing.id}>
                <MyListingItem
                  title={listing.title}
                  content={listing.description}
                  image={
                    listing.foto && listing.foto.length > 0
                      ? listing.foto[0]
                      : NoImage
                  }
                  userId={currentUser.uid}
                  listingId={listing.id}
                />
              </div>
            ))
          ) : (
            <div className={styles.emptyMessage}>
              <p>Jeszcze nie masz ogłoszeń. Może chciałbyś dodać?</p>
              <button onClick={() => navigate("/addlisting")}>DODAJ OGŁOSZENIE</button>
            </div>
          )}
        </div>
      </section>
    </Content>
  );
};

export default MyAds;
