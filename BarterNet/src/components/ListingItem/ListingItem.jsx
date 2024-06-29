import React from "react";

import { useAuth } from "../../contex/AuthProvider";

import styles from "./ListingItem.module.css";

const ListingItem = ({ index, title, content, image, userId, listingId }) => {
  const { currentUser } = useAuth();

  return (
    <div
      className={styles.article}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.article__container}>
        <h2>{title}</h2>
        <p>{content}</p>
        {(() => {
          if (currentUser) {
            return (
              <>
                <a href={`/ad/${userId}/${listingId}`}>
                  <button className={styles.articleButton}>Wymień się</button>
                </a>
              </>
            );
          } else {
            return (
              <>
                <a href="/register">
                  <button className={styles.articleButton}>Wymień się</button>
                </a>
              </>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default ListingItem;
