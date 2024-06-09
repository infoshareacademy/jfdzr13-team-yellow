import { signOut } from "firebase/auth";
import React from "react";

import styles from "./ListingItem.module.css";

import { auth } from "../../config/firebase";
import { useAuth } from "../../contex/AuthProvider";

const ListingItem = () => {
  return (
    <div className={styles.article}>
      <div className={styles.article__container}>
        <h2>Nauka angielskiego online</h2>
        <p>
          Chętnie naucze Cię języka angielskiego. Przez 20 lat mieszkałam w
          Angli i mam doświadczenie w...
        </p>
        <button className={styles.articleButton}>Wymień się</button>
      </div>
    </div>
  );
};

export default ListingItem;
