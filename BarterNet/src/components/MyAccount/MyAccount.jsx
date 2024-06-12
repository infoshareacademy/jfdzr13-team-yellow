import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import styles from "./MyAccount.module.css";
import myAdsIcon from "../..//assets/icons/myAdsIcon.png";
import myProfileIcon from "../../assets/icons/myProfileIcon.png";
import logoutIcon from "../../assets/icons/logoutIcon.png";
import deleteUserIcon from "../../assets/icons/deleteUserIcon.png";

const MyAccount = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className={styles.accountContainer}>
      <h1 className={styles.header}>Moje konto</h1>
      <div className={styles.tileContainer}>
        <Link to="/myAds" className={styles.accountTile}>
          <img src={myAdsIcon} alt="My Ads" className={styles.icon} />
          <span className={styles.tileLabel}>Moje ogłoszenia</span>
          <span className={styles.titleDescription}>
            Przeglądaj i zarządzaj swoimi aktywnymi ogłoszeniami. Edytuj, usuwaj
            lub odnawiaj każde ogłoszenie, aby zwiększyć jego widoczność.{" "}
          </span>
        </Link>
        <Link to="/myProfile" className={styles.accountTile}>
          <img src={myProfileIcon} alt="My Profile" className={styles.icon} />
          <span className={styles.tileLabel}>Mój profil</span>
          <span className={styles.titleDescription}>
            Zobacz i edytuj swoje dane osobowe. Możesz aktualizować swoje
            informacje kontaktowe, zmieniać hasło oraz ustawienia prywatności.{" "}
          </span>
        </Link>
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className={styles.accountTile}
        >
          <img src={logoutIcon} alt="Logout" className={styles.icon} />
          <span className={styles.tileLabel}>Wylogowanie</span>
          <span className={styles.titleDescription}>
            Wyloguj się z konta bezpiecznie i szybko. Pamiętaj, aby wylogować
            się zwłaszcza na urządzeniach publicznych lub współdzielonych.{" "}
          </span>
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className={styles.accountTile}
        >
          <img
            src={deleteUserIcon}
            alt="Delete Account"
            className={styles.icon}
          />
          <span className={styles.tileLabel}>Usuń konto</span>
          <span className={styles.titleDescription}>
            Trwale usuń swoje konto. Ta operacja jest nieodwracalna i usunie
            wszystkie Twoje dane oraz ogłoszenia z naszej platformy.{" "}
          </span>
        </button>
      </div>

      {/* Modale dla potwierdzenia wylogowania i usunięcia konta */}
      <Modal
        isOpen={isLogoutModalOpen}
        onRequestClose={() => setIsLogoutModalOpen(false)}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        contentLabel="Potwierdzenie wylogowania"
      >
        <h2 className={styles.modalHeader}>
          <img
            src={logoutIcon}
            alt="Logout"
            className={styles.modalIconContainer}
          />
          Czy na pewno chcesz się wylogować?
        </h2>
        <button
          onClick={() => setIsLogoutModalOpen(false)}
          className={`${styles.modalButton} ${styles.cancel}`}
        >
          Nie
        </button>
        <button
          onClick={() => setIsLogoutModalOpen(false)}
          className={`${styles.modalButton} ${styles.logout}`}
        >
          Tak, wyloguj
        </button>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        contentLabel="Potwierdzenie usunięcia konta"
      >
        <h2 className={styles.modalHeader}>
          <img
            src={deleteUserIcon}
            alt="Delete Account"
            className={styles.modalIconContainer}
          />
          Czy na pewno chcesz usunąć swoje konto?
        </h2>
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className={`${styles.modalButton} ${styles.cancel}`}
        >
          Nie
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className={`${styles.modalButton} ${styles.logout}`}
        >
          Tak, usuń
        </button>
      </Modal>
    </div>
  );
};

export default MyAccount;
