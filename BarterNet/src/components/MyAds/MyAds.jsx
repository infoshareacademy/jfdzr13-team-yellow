import React, { useEffect, useState } from "react";
import { useAuth } from "../../contex/AuthProvider"; // Adjust path as per your project structure
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase"; // Adjust path as per your project structure
import { useNavigate } from "react-router-dom";
import NoImage from "./assets/no-image.png";
import styles from "./MyAds.module.css";

import MyListingItem from "../MyListingItem/MyListingItem.jsx";

const MyAds = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Assuming you have a custom hook to get currentUser from context

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

            // Filter listings into offer and search categories
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
    <>
      <section className={styles.gridSection}>
        <h2>Oferuję </h2>
        <div className={styles.gridContainer}>
          {offerListings.map((listing, index) => (
            <MyListingItem
              key={index} // Use a unique identifier as the key
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
          ))}
        </div>
      </section>
      <section className={styles.gridSection}>
        <h2>Szukam</h2>
        <div className={styles.gridContainer}>
          {searchListings.map((listing, index) => (
            <MyListingItem
              key={index} // Use a unique identifier as the key
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
          ))}
        </div>
      </section>
    </>
  );
};

export default MyAds;
