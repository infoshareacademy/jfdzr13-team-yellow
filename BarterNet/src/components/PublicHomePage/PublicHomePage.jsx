import React from "react";

import styles from "./PublicHomePage.module.css";

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
                <a href="/login">
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
        <section className={styles.articles}>
          <article className={styles.article}>
            <div className={styles.article__container}>
              <h2>Nauka angielskiego online</h2>
              <p>
                Chętnie naucze Cię języka angielskiego. Przez 20 lat mieszkałam
                w Angli i mam doświadczenie w...
              </p>
              <button className={styles.articleButton}>Wymień się</button>
            </div>
          </article>
          <article className={styles.article}>
            <div className={styles.article__container}>
              <h2>Wyprowadzanie psa</h2>
              <p>
                Nie masz czasu na poranne spacery ze swoim pupuliem, chętnie Ci
                w tym pomogę, bo...
              </p>
              <button className={styles.articleButton}>Wymień się</button>
            </div>
          </article>
          <article className={styles.article}>
            <div className={styles.article__container}>
              <h2>Nauka gry na gitarze</h2>
              <p>
                Zawsze marzyłeś o tym, żeby grać na gitarze, ale rodzice
                zapisali Cię na karate, skorzystaj z...
              </p>
              <button className={styles.articleButton}>Wymień się</button>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default PublicHomePage;
