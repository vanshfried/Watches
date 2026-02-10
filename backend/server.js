import express, { json, urlencoded } from "express";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

/* ---------- SERVE UPLOADED IMAGES ---------- */
app.use("/uploads", express.static("uploads"));
/* ---------- CORS (MUST BE FIRST) ---------- */
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ---------- MIDDLEWARE ---------- */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

/* ---------- ROUTES ---------- */
app.use("/admin", adminRoutes);
app.use("/admin/products", productRoutes);

/* ---------- ROOT ---------- */
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

/* ---------- DB CONNECTION ---------- */
connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
