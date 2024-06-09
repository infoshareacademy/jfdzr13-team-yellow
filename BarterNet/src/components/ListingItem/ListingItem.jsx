import React from "react";

import styles from "./ListingItem.module.css";

const ListingItem = ({ title, content }) => {
  return (
    <div className={styles.article}>
      <div className={styles.article__container}>
        <h2>{title}</h2>
        <p>{content}</p>
        <button className={styles.articleButton}>Wymień się</button>
      </div>
    </div>
  );
};

export default ListingItem;
