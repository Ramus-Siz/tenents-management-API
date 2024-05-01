// const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const { UserModel } = new PrismaClient();

/*
--------------------------
Retrieve one user from 
the database.
--------------------------
*/
async function getOneUser(req, res) {
  const { userId } = req.params;

  try {
    const userFound = await UserModel.findUnique({
      where: {
        id: +userId,
      },
    });
    if (userFound) {
      return res.status(201).send(userFound);
    } else {
      return res.send(userFound);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
Get user by UserName 
*/

async function getUserByuserName(req, res) {
  const { userHandle } = req.params;
  try {
    const user = await UserModel.findUnique({
      where: {
        username: userHandle,
      },
    });

    if (user) {
      return res.status(201).send(user);
    } else {
      return res.send("There is no user with this handle");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

/*
--------------------------
Retrieve all users from 
the database.
--------------------------
*/
async function getAllUsers(req, res) {
  try {
    const users = await UserModel.findMany({});
    res.send(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
--------------------------
Create and save a new user
in the database
--------------------------
*/
async function createUser(req, res) {
  try {
    const newUser = req.body;
    console.log(newUser);
    const userAdded = await UserModel.create({ data: newUser });
    return res.status(200).send(userAdded);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
}

/*
--------------------------
Update a user by the id 
in the request
--------------------------
*/
async function updateUser(req, res, next) {
  try {
    const userUpdate = req.body;
    const { userId } = req.params;
    const user = await UserModel.update({
      where: { id: +userId },
      data: {
        adress: userUpdate.adress,
        type: userUpdate.type,
        composition: userUpdate.composition,
        description: userUpdate.description,
        lessorId: userUpdate.lessorId,
      },
    });
    return res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
}

/*
--------------------------
Delete a user with 
the specified id 
in the request
--------------------------
*/
async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await UserModel.delete({
      where: { id: +userId },
    });
    return res.status(202).send({ user: user, message: "Delete succefull" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
}

/*
--------------------------
Delete all users from 
the database.
--------------------------
*/
async function deleteAllUsers(req, ret) {
  return res.send("Users are deleted");
}

module.exports = {
  createUser,
  deleteAllUsers,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
  getUserByuserName,
};
