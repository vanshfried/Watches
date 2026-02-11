import { Router } from "express";
import multer from "multer";
import Product from "../../models/Product.js";
import adminAuth from "../../middleware/adminAuth.js";

const router = Router();

/* ---------- MULTER CONFIG ---------- */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =====================================================
   CREATE PRODUCT (ADMIN ONLY)
===================================================== */
router.post(
  "/",
  adminAuth,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const { name, description, category } = req.body;

      if (!name || !description || !category) {
        return res
          .status(400)
          .json({ message: "All required fields must be filled" });
      }

      if (!req.files?.mainImage) {
        return res.status(400).json({ message: "Main image is required" });
      }

      const product = await Product.create({
        name,
        description,
        category,
        mainImage: req.files.mainImage[0].filename,
        images: req.files.images
          ? req.files.images.map((file) => file.filename)
          : [],
      });

      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

/* =====================================================
   GET ALL PRODUCTS (ADMIN DASHBOARD)
===================================================== */
router.get("/", adminAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =====================================================
   UPDATE PRODUCT (ADMIN ONLY)
===================================================== */
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =====================================================
   DELETE PRODUCT (ADMIN ONLY)
===================================================== */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
