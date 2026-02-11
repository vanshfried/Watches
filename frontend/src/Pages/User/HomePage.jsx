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
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Luxury Watches Collection</h1>
          <p>Timeless elegance. Precision craftsmanship.</p>
          <button className={styles.shopBtn}>Shop Now</button>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Featured Watches</h2>

        {loading ? (
          <p className={styles.loading}>Loading products...</p>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <div key={product._id} className={styles.card}>
                <img
                  src={`${backendURL}/uploads/${product.mainImage}`}
                  alt={product.name}
                  className={styles.image}
                />
                <div className={styles.cardBody}>
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <button className={styles.viewBtn}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
