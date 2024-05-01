const { PrismaClient } = require("@prisma/client");
const { PayementModel, TenantsModel } = new PrismaClient();

/*
--------------------------
Retrieve one payement from 
the database.
--------------------------
*/
async function getOnePayement(req, res) {
  const { payId } = req.params;
  try {
    const payementFound = await PayementModel.findUnique({
      where: {
        id: +payId,
      },
    });
    if (payementFound) {
      return res.status(201).send(payementFound);
    } else {
      return res.json({ message: "not a payement with the id: " + payId });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
Get user by payement by tenantId 
*/

async function getPayementByTenantId(req, res) {
  const { tenantId } = req.params;
  try {
    const tenantFound = await TenantsModel.findUnique({
      where: {
        id: +tenantId,
      },
    });
    if (tenantFound) {
      const payementFound = await PayementModel.findUnique({
        where: {
          residentId: tenantFound.id,
        },
      });
      return res.status(201).send(payementFound);
    } else {
      return res.json({
        message: "not a payement of a Tenant with the id: " + tenantId,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
--------------------------
Retrieve all payement from 
the database.
--------------------------
*/
async function getAllPayement(req, res) {
  try {
    const payements = await PayementModel.findMany({});
    console.log(payements);
    return res.send(payements);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
--------------------------
Create and save a new payement
in the database
--------------------------
*/
async function createPayement(req, res) {
  try {
    const newPayement = req.body;
    console.log(newPayement);
    const payementAdded = await PayementModel.create({ data: newPayement });
    return res.status(200).send(payementAdded);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
}

/*
--------------------------
Update a payement by the id 
in the request
--------------------------
*/
async function updatePayement(req, res, next) {
  try {
    const payementUpdate = req.body;
    const { bailId: payId } = req.params;
    const payement = await PayementModel.update({
      where: { id: +payId },
      data: {
        month: payementUpdate.month,
        year: payementUpdate.year,
        amount: payementUpdate.amount,
        payAt: payementUpdate.payAt,
        residentId: payementUpdate.residentId,
        bailId: payementUpdate.bailId,
      },
    });
    return res.status(200).send(payement);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
}

/*
--------------------------
Delete a payement with 
the specified id 
in the request
--------------------------
*/
async function deletePayement(req, res) {
  try {
    const { payId } = req.params;
    const payement = await PayementModel.delete({
      where: { id: +payId },
    });
    return res
      .status(202)
      .send({ Payement: payement, message: "Delete succefull" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
}

/*
--------------------------
Delete all payement from 
the database.
--------------------------
*/
async function deleteAllPayement(req, ret) {
  return res.send("Payements are deleted");
}

module.exports = {
  createPayement,
  deleteAllPayement,
  deletePayement,
  getAllPayement,
  getOnePayement,
  updatePayement,
  getPayementByTenantId,
};
