const { PrismaClient } = require("@prisma/client");
const { LandloardModel } = new PrismaClient();

/*
--------------------------
Retrieve one landLord from 
the database.
--------------------------
*/
async function getOneLandLord(req, res) {
  const { lessorId } = req.params;
  try {
    const LandLordFound = await LandloardModel.findUnique({
      where: {
        id: +lessorId,
      },
    });
    if (LandLordFound) {
      return res.status(201).send(LandLordFound);
    } else {
      return res.send(LandLordFound);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
--------------------------
Retrieve all landLord from 
the database.
--------------------------
*/
async function getAllLandLord(req, res, next) {
  try {
    const landLord = await LandloardModel.findMany({});
    res.send(landLord);
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
async function createLandLord(req, res, next) {
  try {
    const newLandLord = req.body;
    console.log(newLandLord);
    const landLordAdded = await LandloardModel.create({ data: newLandLord });
    return res.status(200).send(landLordAdded);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
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
