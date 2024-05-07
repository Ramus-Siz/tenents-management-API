const { PrismaClient } = require("@prisma/client");
const { BailModel, TenantsModel, HousesModel } = new PrismaClient();

/*
--------------------------
Retrieve one bail from 
the database.
--------------------------
*/
async function getOneBail(req, res) {
  const { bailId } = req.params;
  try {
    const bailFound = await BailModel.findUnique({
      where: {
        id: +bailId,
      },
    });
    if (bailFound) {
      return res.status(201).send(bailFound);
    } else {
      return res.json({ message: "not a bail with the id: " + bailId });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
Get user by bail by tenantId 
*/

async function getBailByTenantId(req, res) {
  const { tenantId } = req.params;
  try {
    const tenantFound = await TenantsModel.findUnique({
      where: {
        id: +tenantId,
      },
    });
    if (tenantFound) {
      const bailFound = await BailModel.findUnique({
        where: {
          residentId: tenantFound.id,
        },
        include: {
          payement: true,
        },
      });
      return res.status(201).send(bailFound);
    } else {
      return res.json({ message: "not a tenant with the id: " + tenantId });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
--------------------------
Retrieve all bails from 
the database.
--------------------------
*/
async function getAllBails(req, res) {
  try {
    const bails = await BailModel.findMany({});
    console.log(bails);
    return res.status(200).send(bails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
--------------------------
Create and save a new bail
in the database
--------------------------
*/
async function createBail(req, res) {
  try {
    const newBail = req.body;
    console.log(newBail);
    const house = await HousesModel.findUnique({
      where: {
        adress: newBail.myPropertyId,
      },
    });
    if (house) {
      const bailAdded = await BailModel.create({
        data: {
          finish: newBail.finish,
          residentId: +newBail.residentId,
          myPropertyId: house.id,
        },
      });
      return res.status(201).send(bailAdded);
    } else {
      console.log("eRROR");
      return;
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
}

/*
--------------------------
Update a bail by the id 
in the request
--------------------------
*/
async function updateBail(req, res, next) {
  try {
    const bailUpdate = req.body;
    const { bailId } = req.params;
    const bail = await BailModel.update({
      where: { id: +bailId },
      data: {
        start: bailUpdate.start,
        finish: bailUpdate.finish,
        myPropertyId: bailUpdate.myPropertyId,
        residentId: bailUpdate.residentId,
      },
    });
    return res.status(200).send(bail);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
}

/*
--------------------------
Delete a bail with 
the specified id 
in the request
--------------------------
*/
async function deleteBail(req, res) {
  try {
    const { bailId } = req.params;
    const bail = await BailModel.delete({
      where: { id: +bailId },
    });
    return res.status(202).send({ Bail: bail, message: "Delete succefull" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
}

/*
--------------------------
Delete all bails from 
the database.
--------------------------
*/
async function deleteAllBails(req, ret) {
  return res.send("bails are deleted");
}

module.exports = {
  createBail,
  deleteAllBails,
  deleteBail,
  getAllBails,
  getOneBail,
  updateBail,
  getBailByTenantId,
};
