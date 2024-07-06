mój kod jsx wygląda tak:
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HelpPage.module.css';

const sections = [
  {
    title: "Konto",
    questions: [
      {
        question: "Jak założyć konto?",
        answer: "Aby założyć konto, przejdź do strony rejestracji, wypełnij formularz swoimi danymi i zatwierdź."
      },
      {
        question: "Jak usunąć konto?",
        answer: "Aby usunąć konto, przejdź do ustawień swojego profilu i wybierz opcję 'Usuń Konto'."
      },
      {
        question: "Jak zmienić hasło?",
        answer: "Aby zmienić hasło, przejdź do ustawień swojego profilu i wybierz opcję 'Zmień Hasło'."
      }
    ]
  },
  {
    title: "Ogłoszenia",
    questions: [
      {
        question: "Jak dodać ogłoszenie?",
        answer: "Po zalogowaniu się, przejdź do sekcji 'Dodaj Ogłoszenie' i wypełnij formularz ogłoszenia."
      },
      {
        question: "Jak edytować ogłoszenie?",
        answer: "Możesz edytować ogłoszenie przechodząc do sekcji 'Moje Ogłoszenia' i wybierając opcję 'Edytuj'."
      },
      {
        question: "Jak usunąć ogłoszenie?",
        answer: "Aby usunąć ogłoszenie, przejdź do sekcji 'Moje Ogłoszenia' i wybierz opcję 'Usuń'."
      },
      {
        question: "Jak dodać zdjęcia do ogłoszenia?",
        answer: "Podczas tworzenia lub edytowania ogłoszenia, możesz dodać zdjęcia w sekcji 'Zdjęcia'."
      }
    ]
  },
  {
    title: "Kontakt",
    questions: [
      {
        question: "Jak skontaktować się z użytkownikiem?",
        answer: "Możesz skontaktować się z użytkownikiem poprzez kliknięcie przycisku 'Kontakt' na stronie jego ogłoszenia."
      },
      {
        question: "Jak zaktualizować dane kontaktowe?",
        answer: "Aby zaktualizować dane kontaktowe, przejdź do sekcji 'Mój Profil' i zedytuj dane."
      }
    ]
  },
  {
    title: "Inne",
    questions: [
      {
        question: "Jak wyszukać ogłoszenia?",
        answer: "Aby wyszukać ogłoszenia, skorzystaj z Wyszukiwarki, która pozwala na sortowanie ogłoszeń względem kategorii i lokalizacji."
      },
      {
        question: "Jak zresetować hasło?",
        answer: (
          <>
            Jeśli zapomniałeś hasła, skorzystaj z opcji <Link to="/passwordReset">"Zapomniałem hasła"</Link> na stronie logowania.
          </>
        )
      }
    ]
  }
];

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.helpContainer}>
      <h1 className={styles.header}>Pomoc</h1>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <div className={styles.accordion}>
            {section.questions.map((item, index) => (
              <div key={index} className={styles.accordionItem}>
                <div
                  className={styles.accordionHeader}
                  onClick={() => toggleQuestion(${sectionIndex}-${index})}
                >
                  {item.question}
                </div>
                <div
                  className={${styles.accordionContent} ${
                    activeIndex === ${sectionIndex}-${index} ? styles.active : ''
                  }}
                >
                  <div className={styles.accordionInnerContent}>{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HelpPage;