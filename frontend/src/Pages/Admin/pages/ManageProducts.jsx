import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProductsAdmin, deleteProduct } from "../API/api";
import styles from "../CSS/ManageProducts.module.css";

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await getAllProductsAdmin();
      setProducts(res?.data?.data || []);
    } catch (error) {
      console.error("Fetch products error:", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts((prev) => prev.filter((p) => p._id !== id));

      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete product error:", error);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Products</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6">No products found</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={
                      product.mainImage
                        ? `${import.meta.env.VITE_BACKEND_API_URL}/uploads/${product.mainImage}`
                        : "/no-image.png"
                    }
                    alt={product.name}
                    className={styles.image}
                  />
                </td>

                <td>{product.name}</td>
                <td>{product.category}</td>

                <td>₹{product.price}</td>

                <td>
                  {product.discountedPrice
                    ? `₹${product.discountedPrice}`
                    : "-"}
                </td>

                <td className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() =>
                      navigate(`/admin/edit-product/${product._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
