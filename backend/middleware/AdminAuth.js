const adminAuth = (req, res, next) => {
  const adminId = req.cookies.adminId;

  if (!adminId) {
    return res.status(401).json({ message: "Unauthorized: Admin login required" });
  }

  next();
};

export default adminAuth;
