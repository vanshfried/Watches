import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../CSS/Header.module.css";
import logo from "../../../assets/logomain.png";

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

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.shrink : ""}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="TimeCraft Logo" className={styles.logoImg} />
            <span className={styles.time}>TIME</span>
            <span className={styles.craft}>CRAFT</span>
          </Link>

          <nav className={styles.nav}>
            <Link
              to="/"
              className={location.pathname === "/" ? styles.active : ""}
            >
              Home
            </Link>
            <Link to="/collection">Collection</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
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
          <Link to="/">Home</Link>
          <Link to="/collection">Collection</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          <button className={styles.mobileCart}>Cart</button>
        </div>
      </div>
    </>
  );
};

export default Header;
