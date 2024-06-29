import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyPolicyContainer}>
      <h1 className={styles.header}>Polityka Prywatności</h1>
      <div className={styles.privacyPolicyContent}>
        <h2>Postanowienia ogólne</h2>
        <p>Twoja prywatność jest dla nas bardzo ważna. Niniejsza polityka prywatności opisuje, jakie informacje zbieramy, jak je wykorzystujemy oraz jakie masz prawa w związku z ochroną swoich danych osobowych.</p>

        <h2>Jakie informacje zbieramy?</h2>
        <p>Zbieramy różne rodzaje informacji, w tym:</p>
        <ul>
          <li>Dane osobowe, takie jak imię i nazwisko, adres e-mail, numer telefonu, adres zamieszkania.</li>
          <li>Informacje dotyczące urządzenia, takie jak adres IP, typ przeglądarki, język przeglądarki, czas dostępu i adresy odwiedzanych stron.</li>
          <li>Informacje o lokalizacji, jeśli użytkownik udostępni nam takie informacje.</li>
          <li>Informacje o aktywności w naszej aplikacji, takie jak przeglądane strony, klikane linki i inne działania podejmowane w naszej aplikacji.</li>
        </ul>

        <h2>Jak wykorzystujemy twoje informacje?</h2>
        <p>Wykorzystujemy twoje dane do zapewnienia i poprawy naszych usług, w tym:</p>
        <ul>
          <li>Zapewnienia dostępu do naszych usług i zarządzania nimi.</li>
          <li>Personalizacji treści i rekomendacji.</li>
          <li>Komunikacji z użytkownikami, w tym odpowiadania na zapytania i prośby.</li>
          <li>Przeprowadzania analiz i badań w celu poprawy naszych usług.</li>
          <li>Zapobiegania oszustwom i zapewnienia bezpieczeństwa naszych usług.</li>
          <li>Przesyłania materiałów marketingowych i promocyjnych, jeśli użytkownik wyraził na to zgodę.</li>
        </ul>

        <h2>Jakie masz prawa?</h2>
        <p>Masz prawo do:</p>
        <ul>
          <li>Dostępu do swoich danych osobowych, ich poprawiania, usuwania oraz przenoszenia.</li>
          <li>Wycofania zgody na przetwarzanie danych osobowych w dowolnym momencie.</li>
          <li>Sprzeciwu wobec przetwarzania twoich danych osobowych w określonych celach.</li>
          <li>Żądania ograniczenia przetwarzania twoich danych osobowych.</li>
          <li>Złożenia skargi do organu nadzorczego ds. ochrony danych osobowych.</li>
        </ul>

        <h2>Jak długo przechowujemy twoje dane?</h2>
        <p>Przechowujemy twoje dane osobowe tak długo, jak jest to konieczne do realizacji celów, dla których zostały zebrane, chyba że prawo wymaga dłuższego przechowywania danych lub jest to niezbędne do obrony naszych praw.</p>

        <h2>Jak chronimy twoje informacje?</h2>
        <p>Wdrażamy odpowiednie środki techniczne i organizacyjne, aby chronić twoje dane osobowe przed nieautoryzowanym dostępem, utratą, zniszczeniem lub zmianą. Obejmują one m.in. szyfrowanie danych oraz kontrolę dostępu do naszych systemów i danych.</p>

        <h2>Udostępnianie informacji</h2>
        <p>Nie udostępniamy twoich danych osobowych stronom trzecim, chyba że:</p>
        <ul>
          <li>Jest to konieczne do świadczenia naszych usług (np. dostawcy usług hostingowych).</li>
          <li>Wyraziłeś na to zgodę.</li>
          <li>Jest to wymagane przez prawo lub w odpowiedzi na legalne żądania organów ścigania.</li>
          <li>Jest to konieczne do ochrony naszych praw, prywatności, bezpieczeństwa lub mienia.</li>
        </ul>

        <h2>Pliki cookie i technologie śledzące</h2>
        <p>Używamy plików cookie i innych technologii śledzących do zbierania informacji o twojej aktywności w naszej aplikacji, aby zapewnić lepsze doświadczenia użytkownika, analizować trendy i zarządzać aplikacją. Możesz kontrolować użycie plików cookie za pomocą ustawień swojej przeglądarki.</p>

        <h2>Zmiany w polityce prywatności</h2>
        <p>Możemy od czasu do czasu aktualizować niniejszą politykę prywatności. O wszelkich zmianach będziemy informować na naszej stronie internetowej lub poprzez inne kanały komunikacji. Zalecamy regularne przeglądanie polityki prywatności, aby być na bieżąco z naszymi praktykami ochrony prywatności.</p>

        <h2>Kontakt</h2>
        <p>Jeśli masz jakiekolwiek pytania dotyczące naszej polityki prywatności lub chcesz skorzystać ze swoich praw, prosimy o kontakt.           
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
