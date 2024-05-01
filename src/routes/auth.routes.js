const { Router } = require("express");
const {
  activateAccount,
  deleteAccount,
  logout,
  recoverAccount,
  signin,
  signup,
  login,
} = require("../controllers/authController.js");
const passport = require("passport");

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signup/:landLordRouteParams", signup);

authRouter.post("/signin", signin);
authRouter.post("/login", login);

authRouter.get("/activate-account", activateAccount);

authRouter.get("/logout", logout);

authRouter.post("/recover-account", recoverAccount);

authRouter.post("/delete-account", deleteAccount);

module.exports = authRouter;
