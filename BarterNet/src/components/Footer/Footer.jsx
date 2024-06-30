import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../contex/AuthProvider"; // Importuj useAuth
import styles from "./Footer.module.css";

const Footer = () => {
const { currentUser } = useAuth(); // Sprawdź, czy użytkownik jest zalogowany

return (
<footer className={styles.footer}>
<div className={styles.footerContainer}>
<div className={styles.footerColumn}>
<h3>O nas</h3>
<ul>
<li>
<Link to="/privacy-policy">Polityka Prywatności</Link>
</li>
<li>
<Link to="/terms">Regulamin</Link>
</li>
<li>
<Link to="/help">Pomoc</Link>
</li>
<li>
<Link to="/contact">Kontakt</Link>
</li>
</ul>
</div>
<div className={styles.footerColumn}>
<h3>Usługi</h3>
<ul>
{currentUser ? (
<>
<li>
<Link to="/addListing">Dodaj ogłoszenie</Link>
</li>
<li>
<Link to="/searchPage">Wyszukaj ogłoszenie</Link>
</li>
</>
) : (
<>
<li>
<Link to="/register">Rejestracja</Link>
</li>
<li>
<Link to="/login">Logowanie</Link>
</li>
</>
)}
<li>
<Link to="/myAccount">Twoje Ogłoszenia</Link>
</li>
</ul>
</div>
<div className={styles.footerColumn}>
<h3>Social Media</h3>
<ul className={styles.socialMedia}>
<li>
<a
href="https://www.facebook.com/profile.php?id=61561804825285"
target="_blank"
rel="noopener noreferrer"
>
<FaFacebook className={styles.icon} /> Facebook
</a>
</li>
<li>
<a
href="https://x.com/Barternet_pl/photo"
target="_blank"
rel="noopener noreferrer"
>
<FaTwitter className={styles.icon} /> Twitter
</a>
</li>
<li>
<a
href="https://www.linkedin.com/company/your-barternet/"
target="_blank"
rel="noopener noreferrer"
>
<FaLinkedin className={styles.icon} /> LinkedIn
</a>
</li>
</ul>
</div>
</div>
</footer>
);
};

export default Footer;