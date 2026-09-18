const admin = (req, res, next) => {
  // Check if logged-in user is admin
  if (
    req.user &&
    req.user.role === "admin"
  ) {
    next();
  } else {
    return res.status(403).json({
      message:
        "Access denied. Admins only."
    });
  }
};

module.exports = admin;