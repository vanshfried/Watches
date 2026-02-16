import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createProduct } from "./API/api.js";
import styles from "./CSS/AddProduct.module.css";

const categories = ["luxury", "sports", "casual", "smart", "vintage"];

const AddProduct = () => {
  const [name, setName] = useState("");
  const [mainImage, setMainImage] = useState(null); // File
  const [images, setImages] = useState([]); // File[]
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write product description...</p>",
  });

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setMainImage(file);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editor?.getText().trim()) {
      return alert("Description is required");
    }

    if (!mainImage) {
      return alert("Main image is required");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", editor.getHTML());
    formData.append("mainImage", mainImage);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      setLoading(true);
      await createProduct(formData);
      alert("Product added successfully");

      setName("");
      setMainImage(null);
      setImages([]);
      setCategory("");
      editor.commands.setContent("");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add New Product</h2>

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

        {/* Main Image */}
        <div className={styles.field}>
          <label>Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            required
          />
        </div>

        {/* Additional Images */}
        <div className={styles.field}>
          <label>Additional Images (max 5)</label>
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
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
