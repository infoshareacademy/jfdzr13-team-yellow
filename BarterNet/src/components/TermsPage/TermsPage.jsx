import React from 'react';
import styles from './TermsPage.module.css';

const TermsPage = () => {
  return (
    <div className={styles.termsContainer}>
      <h1 className={styles.header}>Regulamin i warunki świadczenia usług</h1>
      <div className={styles.termsContent}>
        <h2>§1 Postanowienia ogólne</h2>
        <p>Niniejszy regulamin określa zasady korzystania z aplikacji "BarterNet". Administratorem aplikacji jest YELLOW TEAM: Joasia, Magda, Sebastian, Sylwia. Korzystanie z aplikacji oznacza akceptację niniejszego regulaminu.</p>

        <h2>§2 Definicje</h2>
        <p><b>Użytkownik</b> – każda osoba korzystająca z aplikacji.</p>
        <p><b>Administrator</b> – właściciel aplikacji odpowiedzialny za jej działanie i zarządzanie.</p>
        <p><b>Ogłoszenie </b> – oferta zamieszczona przez Użytkownika w aplikacji.</p>

        <h2>§3 Zasady korzystania z aplikacji</h2>
        <p>Użytkownik zobowiązany jest do korzystania z aplikacji zgodnie z jej przeznaczeniem i postanowieniami niniejszego regulaminu. Zabronione jest zamieszczanie ogłoszeń o treści niezgodnej z prawem, obraźliwej lub naruszającej prawa osób trzecich. Administrator zastrzega sobie prawo do usuwania ogłoszeń niezgodnych z regulaminem oraz blokowania kont Użytkowników naruszających regulamin.</p>

        <h2>§4 Rejestracja i konto Użytkownika</h2>
        <p>1. Aby korzystać z pełnej funkcjonalności aplikacji, Użytkownik musi dokonać rejestracji i utworzyć konto.</p>
        <p>2. Użytkownik zobowiązany jest do podania prawdziwych danych podczas rejestracji.</p>
        <p>3. Użytkownik jest odpowiedzialny za utrzymanie poufności swojego hasła oraz za wszelkie działania podejmowane na jego koncie.</p>

        <h2>§5 Zamieszczanie ogłoszeń</h2>
        <p>1. Użytkownik może zamieszczać ogłoszenia dotyczące usług lub towarów, które chce wymienić w ramach barteru.</p>
        <p>2. Ogłoszenia muszą być zgodne z prawdą i rzetelne.</p>
        <p>3. Zabronione jest zamieszczanie ogłoszeń o charakterze reklamowym bez zgody Administratora.</p>

        <h2>§6 Odpowiedzialność</h2>
        <p>1. Administrator nie ponosi odpowiedzialności za treść ogłoszeń zamieszczanych przez Użytkowników.</p>
        <p>2. Administrator nie gwarantuje, że aplikacja będzie działać bez przerw i błędów.</p>
        <p>3. Użytkownik korzysta z aplikacji na własne ryzyko.</p>

        <h2>§7 Ochrona danych osobowych</h2>
        <p>Administrator przetwarza dane osobowe Użytkowników zgodnie z obowiązującymi przepisami prawa. Dane osobowe Użytkowników są zbierane i przetwarzane w celu 
          świadczenia usług dostępnych w aplikacji. Użytkownik ma prawo dostępu do swoich danych osobowych oraz do ich poprawiania i usunięcia.</p>

        <h2>§8 Postanowienia końcowe</h2>
        <p>1. Administrator zastrzega sobie prawo do zmiany niniejszego regulaminu.</p>
        <p>2. Zmiany regulaminu będą publikowane na stronie aplikacji i wchodzą w życie z dniem ich publikacji.</p>
        <p>3. W sprawach nieuregulowanych niniejszym regulaminem mają zastosowanie przepisy prawa polskiego.</p>
      </div>
    </div>
  );
};

export default TermsPage;
