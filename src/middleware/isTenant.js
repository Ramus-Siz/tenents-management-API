module.exports = (req, res, next) => {
  if (req.token.role === "tenant") {
    console.log("Bienvenue dans ton carnet");
    next();
  } else {
    res.status(401).json({
      message:
        "You are not authorized to view this resource because you are not an tenant.",
    });
  }
};
