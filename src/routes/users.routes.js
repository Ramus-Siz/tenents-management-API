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

const userRouter = Router();

//Get all users
userRouter.get(`/`, getAllUsers);

//Get one user by userId
userRouter.get(`/:userId`, getOneUser);
userRouter.get(`/handle/:userHandle`, getUserByuserName);

//Create a new user
userRouter.post(`/add`, createUser);

//Update user by userId
userRouter.put(`/update/:userId`, updateUser);

//Delete user by userId
userRouter.delete(`/delete/:userId`, deleteUser);

//Delete all users
userRouter.delete(`/delete`, deleteAllUsers);

module.exports = userRouter;
