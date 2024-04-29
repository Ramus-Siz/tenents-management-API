// const { PrismaClient } = require("@prisma/client");
// const bcrypt = require("bcrypt");
// const { UserAhuthData } = new PrismaClient();
// const jwt = require("jsonwebtoken");
/*
--------------------------
Create and save a new user
in the database
--------------------------
*/
async function signup(req, res) {
  return res.send("Signup true");
}

/*
--------------------------
Activate user account
--------------------------
*/
function activateAccount(req, res) {
  return res.send("User account is activated");
}

/*
--------------------------
Signin if user have an account 
and roles 
--------------------------
*/
async function signin(req, res) {
  return res.send("you are IN");

  // const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
  //   expiresIn: "1h",
  // });
}

/*
--------------------------
Logout if user is logged 
--------------------------
*/
async function logout(req, res) {
  return res.send("logout true");
}

/*
--------------------------
Recover user account 
--------------------------
*/
async function recoverAccount(req, res) {
  return res.send("User account is recovered");
}

/*
--------------------------
Delete user account 
--------------------------
*/
async function deleteAccount(req, res) {
  return res.send("delete account true");
}

module.exports = {
  activateAccount,
  deleteAccount,
  logout,
  recoverAccount,
  signin,
  signup,
};
