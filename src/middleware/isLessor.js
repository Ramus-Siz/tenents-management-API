module.exports = (req, res, next) => {
  if (req.token.role === "lessor") {
    console.log("");
    next();
  } else {
    res.status(401).json({
      message:
        "You are not authorized to view this resource because you are not an Lessor.",
    });
  }
};
