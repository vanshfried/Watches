import { Link } from "react-router-dom";
import styles from "../CSS/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Brand */}
        <div className={styles.brand}>
          <h2>
            TIME<span>CRAFT</span>
          </h2>
          <p>Crafting timeless elegance for every moment.</p>

          <div className={styles.contactInfo}>
            <p>📍 221B Luxury Street, Mumbai, India</p>
            <p>📞 +91 98765 43210</p>
            <p>✉ support@timecraft.com</p>
            <p>🕒 Mon – Sat: 10:00 AM – 7:00 PM</p>
          </div>
        </div>

        {/* Explore */}
        <div className={styles.section}>
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/">Collection</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
        </div>

        {/* Support */}
        <div className={styles.section}>
          <h4>Customer Support</h4>
          <Link to="/">FAQ</Link>
          <Link to="/">Shipping</Link>
          <Link to="/">Returns</Link>
          <Link to="/">Privacy Policy</Link>
        </div>

        {/* Newsletter */}
        <div className={styles.section}>
          <h4>Stay Updated</h4>
          <p className={styles.newsText}>
            Subscribe to receive updates on new arrivals & offers.
          </p>

          <div className={styles.newsletter}>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>

          <div className={styles.socials}>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} TIMECRAFT — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;