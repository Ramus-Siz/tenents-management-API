// const { PrismaClient } = require("@prisma/client");
// const { UserModel, TweetsModel } = new PrismaClient();

/*
--------------------------
Retrieve one user from 
the database.
--------------------------
*/
async function getOneHouse(req, res) {
  return res.send("one house");
}

/*
Get user by UserName 
*/

async function getAllHousesByHandle(req, res) {
  return res.send("houses geted");
}

/*
--------------------------
Retrieve all users from 
the database.
--------------------------
*/
async function getAllHouses(req, res) {
  return res.send("all house true");
}

/*
--------------------------
Create and save a new user
in the database
--------------------------
*/
async function createHouse(req, res) {
  return res.send("house is created");
}

/*
--------------------------
Update a user by the id 
in the request
--------------------------
*/
async function updateHouse(req, res) {
  return res.send("house is updated");
}

/*
--------------------------
Delete a user with 
the specified id 
in the request
--------------------------
*/
async function deleteHouse(req, res) {
  return res.send("house is deleted");
}

/*
--------------------------
Delete all users from 
the database.
--------------------------
*/
async function deleteAllHouses(req, ret) {
  return res.send("houses are deleted");
}

module.exports = {
  createHouse,
  deleteAllHouses,
  deleteHouse,
  getAllHouses,
  getOneHouse,
  updateHouse,
  getAllHousesByHandle,
};
