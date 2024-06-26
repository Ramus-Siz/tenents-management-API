module.exports = (req, res, next) => {
  if (req.user.role === "tenant" || req.user.role === "lessor") {
    next();
  } else {
    res.status(401).json({
      message:
        "You are not authorized to view this resource because you are not an tenant or LandLord.",
    });
  }
};
