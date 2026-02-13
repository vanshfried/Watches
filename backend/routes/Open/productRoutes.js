// Product Routes
import { Router } from "express";
import Product from "../../models/Product.js";

const router = Router();

/* =====================================================
   GET ALL PRODUCTS (PUBLIC)
===================================================== */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =====================================================
   GET SINGLE PRODUCT (PUBLIC)
===================================================== */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Invalid ID" });
  }
});

export default router;
