import { useNavigate } from "react-router-dom";
import styles from "./CSS/AdminDashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Add New Product</h3>
          <p>Create and publish a new product.</p>
          <button
            onClick={() => navigate("/admin/add-product")}
            className={styles.button}
          >
            Add Product
          </button>
        </div>

        <div className={styles.card}>
          <h3>Manage Products</h3>
          <p>View, edit or delete existing products.</p>
          <button
            onClick={() => navigate("/admin/products")}
            className={styles.button}
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
