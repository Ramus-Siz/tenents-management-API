const { Router } = require("express");
const {
  createUser,
  deleteAllUsers,
  deleteUser,
  getAllUsers,
  getOneUser,
  getUserByuserName,
  updateUser,
} = require("../controllers/userController.js");
const auth = require("../middleware/auth.js");
const isAdmin = require("../middleware/isAdmin.js");
const isLessor = require("../middleware/isLessor.js");
const isTenantOrLessor = require("../middleware/isTenantOrLessor.js");

const userRouter = Router();

//Get all users
userRouter.get(`/`, [], getAllUsers);

//Get one user by userId
userRouter.get(`/:userId`, [auth], getOneUser);
userRouter.get(
  `/handle/:userHandle`,
  [auth, isTenantOrLessor],
  getUserByuserName
);

//Create a new user
userRouter.post(`/add`, [auth, isLessor], createUser);

//Update user by userId
userRouter.put(`/update/:userId`, [auth, isLessor], updateUser);

//Delete user by userId
userRouter.delete(`/delete/:userId`, [auth, isLessor], deleteUser);

//Delete all users
userRouter.delete(`/delete`, [auth, isLessor], deleteAllUsers);

module.exports = userRouter;
