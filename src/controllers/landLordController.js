// const { PrismaClient } = require("@prisma/client");
// const { UserModel, TweetsModel } = new PrismaClient();

/*
--------------------------
Retrieve one landLord from 
the database.
--------------------------
*/
async function getOneLandLord(req, res) {
  return res.send("one bailleur");
}

/*
--------------------------
Retrieve all landLord from 
the database.
--------------------------
*/
async function getAllLandLord(req, res) {
  return res.send("all bailleurs true");
}

/*
--------------------------
Create and save a new user
in the database
--------------------------
*/
async function createLandLord(req, res) {
  return res.send("house is created");
}

/*
--------------------------
Update a landlord by the id 
in the request
--------------------------
*/
async function updateLandLord(req, res) {
  return res.send("house is updated");
}

/*
--------------------------
Delete a landlord with 
the specified id 
in the request
--------------------------
*/
async function deleteLandLord(req, res) {
  return res.send("bailleur is deleted");
}

/*
--------------------------
Delete all landlord from 
the database.
--------------------------
*/
async function deleteAllLandLord(req, ret) {
  return res.send("bailleur are deleted");
}

module.exports = {
  createLandLord,
  deleteAllLandLord,
  deleteLandLord,
  getAllLandLord,
  getOneLandLord,
  updateLandLord,
};
