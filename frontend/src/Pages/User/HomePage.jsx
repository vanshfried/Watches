// HomePage.jsx
import { useEffect, useState } from "react";
import { getAllProducts } from "./API/userapi.js";
import styles from "./CSS/HomePage.module.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      {/* ================= HERO SECTION ================= */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <span className={styles.tagline}>Premium Timepieces</span>

          <h1>
            Redefining <span>Luxury</span> & Precision
          </h1>

          <p>
            Discover handcrafted watches built with timeless elegance,
            exceptional materials, and unmatched craftsmanship.
          </p>

          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>Explore Collection</button>
            <button className={styles.secondaryBtn}>View New Arrivals</button>
          </div>

          <div className={styles.stats}>
            <div>
              <h3>500+</h3>
              <p>Luxury Models</p>
            </div>
            <div>
              <h3>10k+</h3>
              <p>Happy Clients</p>
            </div>
            <div>
              <h3>25+</h3>
              <p>Global Brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BRAND INFO SECTION ================= */}
      <section className={styles.brandSection}>
        <div className={styles.brandContent}>
          <h2>Crafted for Those Who Value Time</h2>
          <p>
            Our collection represents the pinnacle of horological mastery. Every
            piece is engineered with precision and designed to leave a lasting
            impression.
          </p>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section className={styles.productsSection}>
        <div className={styles.sectionHeader}>
          <span>Exclusive Selection</span>
          <h2>Featured Watches</h2>
          <p>
            Explore our handpicked selection of luxury watches designed for
            performance and prestige.
          </p>
        </div>

        {loading ? (
          <div className={styles.loadingWrapper}>
            <p>Loading premium collection...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <div key={product._id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img
                    src={`${backendURL}/uploads/${product.mainImage}`}
                    alt={product.name}
                    className={styles.image}
                  />
                  <span className={styles.badge}>Premium</span>
                </div>

                <div className={styles.cardBody}>
                  <h3>{product.name}</h3>
                  <p className={styles.category}>{product.category}</p>

                  {product.price && (
                    <p className={styles.price}>₹{product.price}</p>
                  )}

                  <div className={styles.cardButtons}>
                    <button className={styles.viewBtn}>View Details</button>
                    <button className={styles.cartBtn}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Own Your Moment</h2>
          <p>Elevate your style with a watch that speaks sophistication.</p>
          <button className={styles.primaryBtn}>Shop Now</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
