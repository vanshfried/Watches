import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import API, { updateProduct } from "../API/api";
import styles from "../CSS/EditProduct.module.css";

const categories = ["luxury", "sports", "casual", "smart", "vintage"];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  /* ==============================
     FETCH PRODUCT
  ============================== */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get("/admin/products");

        const product = res.data.data.find((p) => p._id === id);

        if (!product) {
          alert("Product not found");
          navigate("/admin/manage-products");
          return;
        }

        setName(product.name);
        setCategory(product.category);
        setPrice(product.price);
        setDiscountedPrice(product.discountedPrice || "");

        if (editor) {
          editor.commands.setContent(product.description || "");
        }
      } catch {
        alert("Failed to load product");
      } finally {
        setPageLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, editor]);

  /* ==============================
     IMAGE HANDLERS
  ============================== */
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setMainImage(file);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
  };

  /* ==============================
     SUBMIT UPDATE
  ============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editor?.getText().trim()) {
      return alert("Description is required");
    }

    if (!price || Number(price) <= 0) {
      return alert("Valid price is required");
    }

    if (discountedPrice && Number(discountedPrice) >= Number(price)) {
      return alert("Discounted price must be less than price");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", editor.getHTML());
    formData.append("price", price);

    if (discountedPrice) {
      formData.append("discountedPrice", discountedPrice);
    }

    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      setLoading(true);

      await updateProduct(id, formData);

      alert("Product updated successfully");

      navigate("/admin/manage-products");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <p>Loading product...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Edit Product</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className={styles.field}>
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div className={styles.field}>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            required
          />
        </div>

        {/* Discounted Price */}
        <div className={styles.field}>
          <label>Discounted Price (Optional)</label>
          <input
            type="number"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            min="0"
          />
        </div>

        {/* Main Image */}
        <div className={styles.field}>
          <label>Replace Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
          />
        </div>

        {/* Additional Images */}
        <div className={styles.field}>
          <label>Add Additional Images (max 5)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagesChange}
          />
        </div>

        {/* Category */}
        <div className={styles.field}>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label>Description</label>

          <div className={styles.toolbar}>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              Bold
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              Italic
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              Bullet
            </button>
          </div>

          <div className={styles.editor}>
            <EditorContent editor={editor} />
          </div>
        </div>

        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
