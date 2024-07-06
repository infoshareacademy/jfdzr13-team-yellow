import React from "react";
import { useAuth } from "../../contex/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ListingItem.module.css";

const ListingItem = ({ index, title, content, image, userId, listingId }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      console.log("Redirecting to login with targetUrl:", `/ad/${userId}/${listingId}`);
      navigate("/login", { state: { from: `/ad/${userId}/${listingId}` } });
    }
  };

  return (
    <Link
      to={currentUser ? `/ad/${userId}/${listingId}` : "#"}
      className={styles.articleLink}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleClick}
    >
      <div className={styles.articleContainer}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </Link>
  );
};

export default ListingItem;
