const { PrismaClient } = require("@prisma/client");
const { TenantsModel, userModel, LandloardModel } = new PrismaClient();

/*
--------------------------
Retrieve one user from 
the database.
--------------------------
*/
async function getOneTenant(req, res) {
  const { tenantId } = req.params;
  try {
    const tenantFound = await TenantsModel.findUnique({
      where: {
        id: +tenantId,
      },
    });
    if (tenantFound) {
      return res.status(201).send(tenantFound);
    } else {
      return res.json({ message: "No tenant with id " + tenantId });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("We have a problem");
  }
}

/*
--------------------------
Retrieve all tenant from 
the database.
--------------------------
*/
async function getAllTenants(req, res) {
  try {
    const tenants = await TenantsModel.findMany({});
    console.log(tenants);
    return res.send(tenants);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("We have a problem");
  }
}

async function getAllTenantsByLessorId(req, res) {
  console.log("req", req.headers);
  const { lessorId } = req.params;
  console.log("lessorId", lessorId);
  try {
    const landLord = await LandloardModel.findUnique({
      where: {
        id: +lessorId,
      },
    });
    console.log("landLord", landLord);
    if (landLord) {
      const tenants = await TenantsModel.findMany({
        where: {
          lessorId: landLord.id,
        },
      });
      console.log("tenants", tenants);
      return res.status(201).send(tenants);
    } else {
      return res.send("There is no user with the handle");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

/*
--------------------------
Create and save a new tenant
in the database
--------------------------
*/
async function createTenant(req, res) {
  try {
    const newTenant = req.body;
    console.log(newTenant);
    const tenantAdded = await TenantsModel.create({
      data: newTenant,
    });

    return res
      .status(200)
      .json({ tenantAdded: tenantAdded, userAdded: userAdded });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
}

/*
--------------------------
Update a tenant by the id 
in the request
--------------------------
*/
async function updateTenant(req, res) {
  try {
    const tenantUpdate = req.body;
    const { tenantId } = req.params;
    const tenant = await TenantsModel.update({
      where: { id: +tenantId },
      data: {
        name: tenantUpdate.name,
        prenom: tenantUpdate.prenom,
        email: tenantUpdate.email,
        telephone: tenantUpdate.telephone,
        lessorId: tenantUpdate.lessorId,
      },
    });
    return res.status(200).send(tenant);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
}

/*
--------------------------
Delete a tenant with 
the specified id 
in the request
--------------------------
*/
async function deleteTenant(req, res) {
  return res.send("tenant is deleted");
}

/*
--------------------------
Delete all tenants from 
the database.
--------------------------
*/
async function deleteAllTenants(req, ret) {
  return res.send("tenants are deleted");
}

module.exports = {
  createTenant,
  deleteAllTenants,
  deleteTenant,
  getAllTenants,
  getOneTenant,
  updateTenant,
  getAllTenantsByLessorId,
};
