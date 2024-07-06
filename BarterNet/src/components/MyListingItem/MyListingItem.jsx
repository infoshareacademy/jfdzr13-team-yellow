// import React from "react";
import { useAuth } from "../../contex/AuthProvider";
import { Link } from "react-router-dom";
import styles from "./MyListingItem.module.css";

const MyListingItem = ({ index, title, content, image, userId, listingId }) => {
  const { currentUser } = useAuth();

  return (
    <Link to={`/ad/${userId}/${listingId}`} className={styles.link}>
      <div
        className={styles.article}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.article__container}>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
    </Link>
  );
};

export default MyListingItem;
