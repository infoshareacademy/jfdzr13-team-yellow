import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contex/AuthProvider";
import { auth, db } from "../../config/firebase";
import { deleteUser, getAuth } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import Modal from "react-modal";
import styles from "./MyAccount.module.css";
import myAdsIcon from "../../assets/icons/myAdsIcon.png";
import myProfileIcon from "../../assets/icons/myProfileIcon.png";
import logoutIcon from "../../assets/icons/logoutIcon.png";
import deleteUserIcon from "../../assets/icons/deleteUserIcon.png";

const MyAccount = () => {
  const { logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLogoutModalOpen(false);
      navigate("/PublicHomePage");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const deleteUserData = async (uid) => {
    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    try {
      await deleteUser(user); // Usuwa użytkownika z Authentication
      await deleteUserData(user.uid); // Usuwa dane użytkownika z Firestore
      navigate("/PublicHomePage");
    } catch (error) {
      console.error("Delete account failed", error);
    }
  };

  return (
    <div className={styles.accountContainer}>
      <h1 className={styles.header}>Moje konto</h1>
      <div className={styles.tileContainer}>
        <Link to="/MyAds" className={styles.accountTile}>
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
        <div className={styles.modalIconContainer}>
          <img src={logoutIcon} alt="Logout" className={styles.imageIcon} />{" "}
        </div>
        <h2>Czy na pewno chcesz się wylogować?</h2>

        <div className={styles.modalButtonContainer}>
          <button
            onClick={() => setIsLogoutModalOpen(false)}
            className={`${styles.modalButton} ${styles.cancel}`}
          >
            NIE
          </button>
          <button
            onClick={handleLogout}
            className={`${styles.modalButton} ${styles.logout}`}
          >
            TAK
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        contentLabel="Potwierdzenie usunięcia konta"
      >
        <div className={styles.modalIconContainer}>
          <img
            src={deleteUserIcon}
            alt="Delete Account"
            className={styles.imageIcon}
          />{" "}
        </div>
        <h2>Czy na pewno chcesz usunąć swoje konto?</h2>

        <div className={styles.modalButtonContainer}>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className={`${styles.modalButton} ${styles.cancel}`}
          >
            NIE
          </button>

          <button
            onClick={handleDeleteAccount}
            className={`${styles.modalButton} ${styles.logout}`}
          >
            TAK
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyAccount;
