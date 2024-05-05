const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("Auth Token: ", token);
    req.token = jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.sendStatus(403); // Jeton invalide ou expiré
      }
      req.user = payload;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: error.messageS });
  }
};
