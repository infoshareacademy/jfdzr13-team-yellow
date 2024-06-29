import React from "react";
import { useAuth } from "../../contex/AuthProvider";

import styles from "./MyListingItem.module.css";

const MyListingItem = ({ index, title, content, image, userId, listingId }) => {
  const { currentUser } = useAuth();

  return (
    <div
      className={styles.article}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.article__container}>
        <h2>{title}</h2>
        <p>{content}</p>
        <div className={styles.buttonContainer}>
          <a href={`/ad/${userId}/${listingId}`}>
            <button className={styles.articleButton}>Podgląd</button>
          </a>
          <a href={`/ad/${userId}/${listingId}`}>
            <button className={styles.articleButton}>Edytuj</button>
          </a>
          <a href={`/ad/${userId}/${listingId}`}>
            <button className={styles.articleButton}>Usuń</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyListingItem;
