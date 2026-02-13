import Admin from "../models/admin.js";

const adminAuth = async (req, res, next) => {
  try {
    const adminId = req.cookies.adminId;

    if (!adminId) {
      return res.status(401).json({
        message: "Unauthorized: Admin login required",
      });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(401).json({
        message: "Unauthorized: Invalid admin",
      });
    }

    req.admin = admin; // attach admin to request

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export default adminAuth;
