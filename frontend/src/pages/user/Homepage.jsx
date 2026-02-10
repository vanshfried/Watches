import styles from "../usercss/Homepage.module.css";

import image01 from "./images/image-01.jpg";
import image02 from "./images/image-02.jpg";
import image03 from "./images/image-03.jpg";
import image04 from "./images/image-04.jpg";
import image05 from "./images/image-05.jpg";

const Homepage = () => {
  return (
    <div className={styles.home}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>
          NOIR<span>TIME</span>
        </h1>
        <ul className={styles.navLinks}>
          <li>Home</li>
          <li>Watches</li>
          <li>Collections</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h2>Define Your Time</h2>
          <p>
            NoirTime creates luxury watches for those who lead, not follow.
            Designed with precision, crafted with passion, and built to last
            generations.
          </p>
          <button className={styles.cta}>Shop Watches</button>
        </div>

        <div className={styles.heroImage}>
          <img src={image01} alt="Luxury Watch" />
        </div>
      </section>

      {/* BRAND STORY */}
      <section className={styles.story}>
        <h3>Our Philosophy</h3>
        <p>
          At NoirTime, we believe a watch is more than an accessory — it’s a
          reflection of ambition. Every timepiece is engineered with premium
          materials, timeless design, and obsessive attention to detail.
        </p>
      </section>

      {/* FEATURED WATCHES */}
      <section className={styles.featured}>
        <h3>Featured Timepieces</h3>

        <div className={styles.watchGrid}>
          <div className={styles.watchCard}>
            <img src={image02} alt="Watch" />
            <h4>Midnight Steel</h4>
            <p>Automatic · Sapphire Glass</p>
            <span>$499</span>
          </div>

          <div className={styles.watchCard}>
            <img src={image03} alt="Watch" />
            <h4>Obsidian Gold</h4>
            <p>Chronograph · Limited Edition</p>
            <span>$699</span>
          </div>

          <div className={styles.watchCard}>
            <img src={image04} alt="Watch" />
            <h4>Shadow Chrono</h4>
            <p>Swiss Movement · 10ATM</p>
            <span>$899</span>
          </div>
        </div>
      </section>

      

      {/* CRAFTSMANSHIP */}
      <section className={styles.craft}>
        <img src={image05} alt="Craftsmanship" />
        <div>
          <h3>Precision Engineering</h3>
          <ul>
            <li>✔ Swiss-grade automatic movements</li>
            <li>✔ Sapphire crystal glass</li>
            <li>✔ Surgical stainless steel</li>
            <li>✔ Water resistance up to 10ATM</li>
          </ul>
        </div>
      </section>


      {/* NEWSLETTER */}
      <section className={styles.newsletter}>
        <h3>Join the NoirTime Circle</h3>
        <p>Early access to releases, private sales, and exclusives.</p>
        <div className={styles.subscribe}>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div>
          <h4>NOIRTIME</h4>
          <p>Luxury watches designed for modern leaders.</p>
        </div>

        <div>
          <p>© 2026 NoirTime</p>
          <p>Privacy · Terms · Support</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
