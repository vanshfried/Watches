// Product Routes
import { Router } from "express";
import mongoose from "mongoose";
import Product from "../../models/Product.js";

const router = Router();

/* =====================================================
   GET ALL PRODUCTS (PUBLIC)
===================================================== */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean({ virtuals: true }); // include virtuals

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
});

/* =====================================================
   GET SINGLE PRODUCT (PUBLIC)
===================================================== */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId first
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id).lean({ virtuals: true });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching product",
    });
  }
});

export default router;
