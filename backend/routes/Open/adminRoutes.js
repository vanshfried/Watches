import { Router } from "express";
import { hash, compare } from "bcryptjs";
import Admin from "../../models/admin.js";

const router = Router();

/**
 * CREATE ADMIN
 */
// router.post("/create", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ message: "All fields required" });

//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin)
//       return res.status(409).json({ message: "Admin already exists" });

//     const hashedPassword = await hash(password, 10);

//     const admin = await Admin.create({
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       message: "Admin created successfully",
//       adminId: admin._id,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

/**
 * LOGIN ADMIN
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.cookie("adminId", admin._id.toString(), {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * LOGOUT ADMIN
 */
router.post("/logout", (req, res) => {
  res.clearCookie("adminId");
  res.json({ message: "Logged out successfully" });
});

export default router;
