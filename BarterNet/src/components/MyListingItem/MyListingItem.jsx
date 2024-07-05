import React from "react";
import { useAuth } from "../../contex/AuthProvider";

import styles from "./MyListingItem.module.css";

const MyListingItem = ({ index, title, content, image, userId, listingId }) => {
  const { currentUser } = useAuth();

  return (
    <a href={`/ad/${userId}/${listingId}`}>
      <div
        className={styles.article}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.article__container}>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
    </a>
  );
};

export default MyListingItem;
