import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../CSS/AdminHeader.module.css";
import { adminLogout } from "../API/api.js";

function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await adminLogout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className={styles.header}>
      {/* Clickable Logo */}
      <Link
        to="/admin/dashboard"
        className={styles.logo}
        onClick={() => setMenuOpen(false)}
      >
        Admin Panel
      </Link>

      {/* Hamburger */}
      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
        <Link to="/admin/products" onClick={() => setMenuOpen(false)}>
          All Products
        </Link>

        <Link to="/admin/add-product" onClick={() => setMenuOpen(false)}>
          Add Product
        </Link>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default AdminHeader;
