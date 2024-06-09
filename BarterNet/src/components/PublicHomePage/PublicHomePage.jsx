import React from "react";

import styles from "./PublicHomePage.module.css";
import ListingItem from "../ListingItem/ListingItem.jsx";

import HeroBackground from "./assets/hero-background.png";

const PublicHomePage = () => {
  return (
    <div>
      <div className={styles.site}>
        <section className={styles.hero}>
          <div className={styles.heroButtonContainer}>
            <h1>Wymień się!</h1>
            <p>
              Znajdź najlepsze oferty i wymieniaj się usługami, na te, których
              potrzebujesz. Dołącz do nas i zacznij korzystać z możliwości,
              jakie daje nowoczesny barter.
            </p>
            <div className={styles.heroButtonWrapper}>
              <div>
                <a href="/register">
                  <button className={styles.heroButton}>Zacznij teraz</button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Sekcja 2 */}
        <section className={styles.buttonsSection}>
          <div className={styles.buttonscontainer}>
            <button className={styles.button}>Najpopularniejsze oferty</button>
            <button className={styles.button}>Poznaj korzyści barteru</button>
            <button className={styles.button}>Pierwsze kroki</button>
          </div>
        </section>

        {/* Sekcja 3 */}
        <section className={styles.gridSection}>
          <div className={styles.gridContainer}>
            <ListingItem />
            <ListingItem />
            <ListingItem />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicHomePage;
