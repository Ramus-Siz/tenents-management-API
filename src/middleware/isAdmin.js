module.exports = (req, res, next) => {
  if (req.user.role === "admin") {
    console.log("");
    next();
  } else {
    res.status(401).json({
      message:
        "You are not authorized to view this resource because you are not an Admin.",
    });
  }
};
