// ================= HOME PAGE =================
import { useEffect, useState } from "react";
import { getAllProducts, BASE_URL } from "./API/userapi.js";
import styles from "./CSS/HomePage.module.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();

        // backend returns: { success, count, data }
        setProducts(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
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
        <div className={styles.heroShell}>
          <div className={styles.heroContent}>
            <span className={styles.tagline}>Premium Timepieces</span>
            <h1 className={styles.heroTitle}>
              Redefining <span>Luxury</span> & Precision
            </h1>
            <p className={styles.heroSubtitle}>
              Discover handcrafted watches built with timeless elegance,
              exceptional materials, and unmatched craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section className={styles.productsSection}>
        <div className={styles.sectionHeader}>
          <span>Exclusive Selection</span>
          <h2>Featured Watches</h2>
        </div>

        {loading ? (
          <div className={styles.loadingWrapper}>
            <p>Loading premium collection...</p>
          </div>
        ) : products.length === 0 ? (
          <div className={styles.loadingWrapper}>
            <p>No products available</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => {
              const imageUrl = product?.mainImage
                ? `${BASE_URL}/uploads/${product.mainImage}`
                : "/placeholder.jpg";

              const isDiscounted =
                product.discountedPrice &&
                product.discountedPrice < product.price;

              const finalPrice = isDiscounted
                ? product.discountedPrice
                : product.price;

              const discountPercent = isDiscounted
                ? Math.round(
                    ((product.price - product.discountedPrice) /
                      product.price) *
                      100,
                  )
                : 0;

              return (
                <div key={product._id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className={styles.image}
                    />

                    {isDiscounted && (
                      <span className={styles.discountBadge}>
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <h3>{product.name}</h3>
                    <p className={styles.category}>{product.category}</p>

                    <div className={styles.priceWrapper}>
                      {isDiscounted && (
                        <span className={styles.oldPrice}>
                          ₹{product.price}
                        </span>
                      )}

                      <span className={styles.newPrice}>₹{finalPrice}</span>
                    </div>

                    <div className={styles.cardButtons}>
                      <button className={styles.viewBtn}>View Details</button>
                      <button className={styles.cartBtn}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
