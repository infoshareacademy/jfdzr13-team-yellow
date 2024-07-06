import { Link } from "react-router-dom";
import { useAuth } from "../../contex/AuthProvider";
import styles from "./ListingItem.module.css";

const ListingItem = ({ index, title, content, image, userId, listingId }) => {
  const { currentUser } = useAuth();

  return (
    <article className={styles.ListingItem}>
      <Link
        to={currentUser ? `/ad/${userId}/${listingId}` : "/login"}
        className={styles.ListingItemLink}
      >
        <div
          className={styles.ListingItemImage}
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <div className={styles.ListingItemContainer}>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </Link>
    </article>
  );
};

export default ListingItem;
