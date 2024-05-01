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

const userRouter = Router();

//Get all users
userRouter.get(`/`, [auth], getAllUsers);

//Get one user by userId
userRouter.get(`/:userId`, [auth], getOneUser);
userRouter.get(`/handle/:userHandle`, [auth], getUserByuserName);

//Create a new user
userRouter.post(`/add`, [auth], createUser);

//Update user by userId
userRouter.put(`/update/:userId`, [auth], updateUser);

//Delete user by userId
userRouter.delete(`/delete/:userId`, [auth], deleteUser);

//Delete all users
userRouter.delete(`/delete`, [auth], deleteAllUsers);

module.exports = userRouter;
