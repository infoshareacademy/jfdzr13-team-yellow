import React from "react";

import styles from "./PublicHomePage.module.css";
import ListingItem from "../ListingItem/ListingItem.tsx";

import HeroBackground from "./assets/hero-1600-background.webp";
import {mockUsers} from "../../utils/db.js";

const articles = [
  {
    id: 1,
    title: "Nauka angielskiego online",
    content:
      "Chętnie naucze Cię języka angielskiego. Przez 20 lat mieszkałam w Angli i mam doświadczenie w...",
    image: "https://picsum.photos/400/600?random=1",
  },

  {
    id: 2,
    title: "Wyprowadzanie psa",
    content:
      "Nie masz czasu na poranne spacery ze swoim pupuliem, chętnie Ci w tym pomogę, bo...",
    image: "https://picsum.photos/400/600?random=2",
  },
  {
    id: 3,
    title: "Nauka gry na gitarze",
    content:
      "Zawsze marzyłeś o tym, żeby grać na gitarze, ale rodzice zapisali Cię na karate, skorzystaj z...",
    image: "https://picsum.photos/400/600?random=3",
  },
  {
    id: 4,
    title: "Korepetycje z matematyki",
    content:
      "Potrzebujesz pomocy w zrozumieniu matematyki? Jestem do Twojej dyspozycji. Pomożemy Ci przejść przez zagadnienia od podstaw do bardziej zaawansowanych.",
    image: "https://picsum.photos/400/600?random=4",
  },
  {
    id: 5,
    title: "Kurs gotowania wegetariańskiego",
    content:
      "Chcesz nauczyć się przygotowywać pyszne wegetariańskie potrawy? Zapraszam na kurs gotowania, gdzie nauczymy się przyrządzać zdrowe i smaczne dania bez mięsa.",
    image: "https://picsum.photos/400/600?random=5",
  },
  {
    id: 6,
    title: "Usługi opiekuńcze dla osób starszych",
    content:
      "Potrzebujesz wsparcia w opiece nad osobą starszą? Oferuję profesjonalne usługi opiekuńcze, w tym pomoc w codziennych czynnościach oraz towarzyszenie na spacerach i wizytach lekarskich.",
    image: "https://picsum.photos/400/600?random=6",
  },
  {
    id: 7,
    title: "Zajęcia jogi dla początkujących",
    content:
      "Chcesz zacząć praktykować jogę, ale nie wiesz od czego zacząć? Zapraszam na zajęcia dla początkujących, gdzie nauczysz się podstawowych pozycji i technik oddechowych.",
    image: "https://picsum.photos/400/600?random=7",
  },
  {
    id: 8,
    title: "Pranie i prasowanie",
    content:
      "Brakuje Ci czasu na pranie i prasowanie? Oferuję profesjonalne usługi prania oraz prasowania, abyś mógł cieszyć się czystą i wyprasowaną odzieżą bez trudu.",
    image: "https://picsum.photos/400/600?random=8",
  },
  {
    id: 9,
    title: "Remontowanie mebli",
    content:
      "Twoje meble potrzebują odświeżenia? Przynieś je do mnie, a z przyjemnością pomaluję, wypoleruję lub naprawię uszkodzenia, abyś mógł cieszyć się pięknym wyglądem swojego mieszkania.",
    image: "https://picsum.photos/400/600?random=9",
  },
  {
    id: 10,
    title: "Instrukcje z zakresu pierwszej pomocy",
    content:
      "Chcesz nauczyć się udzielać pierwszej pomocy w nagłych wypadkach? Oferuję instrukcje z zakresu udzielania pomocy przedmedycznej, abyś mógł być gotowy na każdą sytuację.",
    image: "https://picsum.photos/400/600?random=10",
  },
  {
    id: 11,
    title: "Nauka tańca towarzyskiego",
    content:
      "Chcesz nauczyć się tańczyć w stylu latynoamerykańskim lub standardowym? Zapraszam na zajęcia z tańca towarzyskiego, gdzie nauczysz się eleganckich i efektownych figur pod okiem doświadczonych instruktorów.",
    image: "https://picsum.photos/400/600?random=11",
  },
];

const PublicHomePage = () => {
  console.log('--------------RENDER KOMPONENTU----------')
  // Shuffle the articles array
  const shuffledUsers = mockUsers.sort(() => 0.5 - Math.random());

  // Get first 3 random users with at least one offer
  const randomUsersWithAtLeastOneOffer = shuffledUsers.reduce((acc, curr) => {

    const {listings} = curr
    const [offersObject, searchesObject] = listings
    const {offer} = offersObject

    if(offer.length > 0 && acc.length < 3) {
      acc.push(curr)
    }

    // sprawdź czy user ma jakąś ofertę
    // jeśli tak? to dodaj do naszej tablicy JEŚLI jest tam mniej niż 3 element
    // jeśli nie? to nei dodawaj tego, fuj
    return acc
  },[])

  const threeRandomOffers = randomUsersWithAtLeastOneOffer.map((user) => {
    const {  listings} = user;
    const [offersObject, searchesObject] = listings
    const {offer} = offersObject
    // const {search} = searchesObject

    return offer[0]
  })

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
        <section className={styles.gridSection}>
          <div className={styles.gridContainer}>
            {threeRandomOffers.map((oneOffer ) => (
              <ListingItem
                key={oneOffer.title}
                oneOffer={oneOffer}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicHomePage;

//TODO 1: logika zwracajaca 3 randomowe searche
//TODO 2*: połączyć logikę zwracania offert i searchy w jednej funkcji
//TODO 3**: wyniesienie tej logiki do customowego Hooka