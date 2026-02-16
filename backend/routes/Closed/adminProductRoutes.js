// Admin Product Routes
import { Router } from "express";
import multer from "multer";
import mongoose from "mongoose";
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
      const { name, description, category, price, discountedPrice } = req.body;

      // ✅ Required fields validation
      if (!name || !description || !category || !price) {
        return res.status(400).json({
          success: false,
          message: "Name, description, category and price are required",
        });
      }

      if (!req.files?.mainImage) {
        return res.status(400).json({
          success: false,
          message: "Main image is required",
        });
      }

      // Convert to numbers
      const parsedPrice = Number(price);
      const parsedDiscount = discountedPrice ? Number(discountedPrice) : null;

      const product = await Product.create({
        name,
        description,
        category,
        price: parsedPrice,
        discountedPrice: parsedDiscount,
        mainImage: req.files.mainImage[0].filename,
        images: req.files.images
          ? req.files.images.map((file) => file.filename)
          : [],
      });

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
);

/* =====================================================
   GET ALL PRODUCTS (ADMIN DASHBOARD)
===================================================== */
router.get("/", adminAuth, async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean({ virtuals: true });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* =====================================================
   UPDATE PRODUCT (ADMIN ONLY)
===================================================== */
router.put(
  "/:id",
  adminAuth,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;

      // ✅ Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const { name, description, category, price, discountedPrice } = req.body;

      // Update text fields if provided
      if (name) product.name = name;
      if (description) product.description = description;
      if (category) product.category = category;

      // ✅ Handle price updates
      if (price !== undefined) {
        product.price = Number(price);
      }

      if (discountedPrice !== undefined) {
        product.discountedPrice =
          discountedPrice === ""
            ? null // remove discount if empty
            : Number(discountedPrice);
      }

      // ✅ Handle image updates
      if (req.files?.mainImage) {
        product.mainImage = req.files.mainImage[0].filename;
      }

      if (req.files?.images) {
        product.images = req.files.images.map((file) => file.filename);
      }

      await product.save();

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
);

/* =====================================================
   DELETE PRODUCT (ADMIN ONLY)
===================================================== */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
