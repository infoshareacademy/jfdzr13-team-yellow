import React from "react";

const PublicHomePage = () => {
  return (
    <div>
      <div>PublicHomePage</div>

      <div>
        <section className="hero">
          <h1>Wymień się!</h1>
          <p>
            Znajdź najlepsze oferty i wymieniaj się usługami, na te, których
            potrzebujesz. Dołącz do nas i zacznij korzystać z możliwości, jakie
            daje nowoczesny barter.
          </p>
          <button>Zacznij teraz</button>
        </section>

        {/* Sekcja 2 */}
        <section className="buttons-section">
          <button>Najpopularniejsze oferty</button>
          <button>Poznaj korzyści barteru</button>
          <button>Pierwsze kroki</button>
        </section>

        {/* Sekcja 3 */}
        <section className="articles">
          <article>
            <img
              src="https://t4.ftcdn.net/jpg/05/34/48/37/360_F_534483775_2hBgOxryd3El6t3tKOtbcM95Yq3OmTGG.jpg"
              alt=""
            />
            <h2>Nauka angielskiego online</h2>
            <p>
              Chętnie naucze Cię języka angielskiego. Przez 20 lat mieszkałam w
              Angli i mam doświadczenie w...
            </p>
            <button>Wymień się</button>
          </article>
          <article>
            <img
              src="https://t4.ftcdn.net/jpg/05/34/48/37/360_F_534483775_2hBgOxryd3El6t3tKOtbcM95Yq3OmTGG.jpg"
              alt=""
            />
            <h2>Wyprowadzanie psa</h2>
            <p>
              Nie masz czasu na poranne spacery ze swoim pupuliem, chętnie Ci w
              tym pomogę, bo...
            </p>
            <button>Wymień się</button>
          </article>
          <article>
            <img
              src="https://t4.ftcdn.net/jpg/05/34/48/37/360_F_534483775_2hBgOxryd3El6t3tKOtbcM95Yq3OmTGG.jpg"
              alt=""
            />
            <h2>Nauka gry na gitarze</h2>
            <p>
              Zawsze marzyłeś o tym, żeby grać na gitarze, ale rodzice zapisali
              Cię na karate, skorzystaj z...
            </p>
            <button>Wymień się</button>
          </article>
        </section>
      </div>
    </div>
  );
};

export default PublicHomePage;
