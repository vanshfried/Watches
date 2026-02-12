import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../CSS/Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.shrink : ""}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            TIME<span>CRAFT</span>
          </Link>

          <nav className={styles.nav}>
            <Link
              to="/"
              className={location.pathname === "/" ? styles.active : ""}
            >
              Home
            </Link>
            <Link to="/">Collection</Link>
            <Link to="/">About</Link>
            <Link to="/">Contact</Link>
          </nav>

          <div className={styles.right}>
            <button className={styles.cartBtn}>Cart</button>

            <div
              className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
        <div className={styles.goldLine}></div>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.show : ""}`}>
        <div className={styles.mobileTop}>
          <span className={styles.mobileLogo}>TIMECRAFT</span>
          <span className={styles.close} onClick={() => setMenuOpen(false)}>
            ✕
          </span>
        </div>

        <div className={styles.mobileLinks}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Collection
          </Link>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          <button className={styles.mobileCart}>Cart</button>
        </div>
      </div>
    </>
  );
};

export default Header;
