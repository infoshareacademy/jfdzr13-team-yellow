import React from "react";

import { useAuth } from "../../contex/AuthProvider";

import styles from "./ListingItem.module.css";

const ListingItem = ({ index, title, content }) => {
  const { currentUser } = useAuth();

  return (
    <div className={styles.article}>
      <div className={styles.article__container}>
        <h2>{title}</h2>
        <p>{content}</p>
        {(() => {
          if (currentUser) {
            return (
              <>
                <a href={`/article${index}`}>
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
