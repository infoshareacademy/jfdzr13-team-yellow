import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserHomePage.module.css';
import addListingIcon from '../../assets/icons/addListingIcon.png'; 
import searchIcon from '../../assets/icons/searchIcon.png';
import myProfileIcon from '../../assets/icons/myProfileIcon.png';

const UserHomePage = () => {
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.accountContainer}>
        <div className={styles.tileContainer}>
          <Link to="/addlisting" className={styles.accountTile}>
            <img src={addListingIcon} alt="Add Listing" className={styles.icon} />
            <span className={styles.tileLabel}>Dodaj ogłoszenie</span>
            <span className={styles.tileDescription}>
              W kilku prostych krokach dodawaj swoje ogłoszenia i dołącz do społeczności ludzi otwartych na wymianę. Poznaj korzyści barteru i stwórz własne ogłoszenie.
            </span>
          </Link>
          <Link to="/searchpage" className={styles.accountTile}>
            <img src={searchIcon} alt="Search" className={styles.icon} />
            <span className={styles.tileLabel}>Wyszukaj ogłoszenie</span>
            <span className={styles.tileDescription}>
              Szukaj barterów blisko siebie i wyszukuj interesujące ogłoszenia z całej Polski. Dopasuj ogłoszenia do swoich potrzeb. Sprawdź interesujące bartery i wymieniaj się usługami. 
            </span>
          </Link>
          <Link to="/myaccount" className={styles.accountTile}>
            <img src={myProfileIcon} alt="My Profile" className={styles.icon} />
            <span className={styles.tileLabel}>Twoje konto</span>
            <span className={styles.tileDescription}>
              Zobacz i edytuj swoje dane osobowe. Możesz aktualizować swoje
              informacje kontaktowe, zmieniać hasło oraz ustawienia prywatności.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
