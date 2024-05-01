const { PrismaClient } = require("@prisma/client");
const { HousesModel, LandloardModel } = new PrismaClient();

/*
--------------------------
Retrieve one HOUSE from 
the database.
--------------------------
*/
async function getOneHouse(req, res) {
  const { houseId } = req.params;
  try {
    const houseFound = await HousesModel.findUnique({
      where: {
        id: +houseId,
      },
    });
    if (houseFound) {
      return res.status(201).send(houseFound);
    } else {
      return res.send(houseFound);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
Get user by UserName 
*/

async function getAllHousesByHandle(req, res) {
  const { lessorId } = req.body;
  console.log(lessorId);
  try {
    const landLord = await LandloardModel.findUnique({
      where: {
        id: +lessorId,
      },
    });
    console.log(landLord);

    if (landLord) {
      const houses = await HousesModel.findMany({
        where: {
          lessorId: landLord.id,
        },
      });
      return res.status(201).send(houses);
    } else {
      return res.send("There is no user with the handle");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

/*
--------------------------
Retrieve all HOUSES from 
the database.
--------------------------
*/
async function getAllHouses(req, res) {
  try {
    const houses = await HousesModel.findMany({});
    console.log(houses);
    res.send(houses);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
--------------------------
Create and save a new HOUSE
in the database
--------------------------
*/
async function createHouse(req, res) {
  try {
    const newHouse = req.body;
    console.log(newHouse);
    const houseAdded = await HousesModel.create({ data: newHouse });
    return res.status(200).send(houseAdded);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
}

/*
--------------------------
Update a HOUSE by the id 
in the request
--------------------------
*/
async function updateHouse(req, res, next) {
  try {
    const houseUpdate = req.body;
    const { houseId } = req.params;
    const house = await HousesModel.update({
      where: { id: +houseId },
      data: {
        adress: houseUpdate.adress,
        type: houseUpdate.type,
        composition: houseUpdate.composition,
        description: houseUpdate.description,
        lessorId: houseUpdate.lessorId,
      },
    });
    return res.status(200).send(house);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
}

/*
--------------------------
Delete a HOUSE with 
the specified id 
in the request
--------------------------
*/
async function deleteHouse(req, res) {
  try {
    const { houseId } = req.params;
    const house = await HousesModel.delete({
      where: { id: +houseId },
    });
    return res.status(202).send({ house: house, message: "Delete succefull" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
}

/*
--------------------------
Delete all HOUSES from 
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