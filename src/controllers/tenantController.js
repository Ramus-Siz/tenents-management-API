const { PrismaClient } = require("@prisma/client");
const { TenantsModel, userModel, LandloardModel } = new PrismaClient();
const bcrypt = require("bcrypt");

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
      include: {
        payements: true,
        bails: true,
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
    const tenants = await TenantsModel.findMany({
      include: {
        bails: true,
        payements: true,
      },
    });
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
        include: {
          bails: true,
          payements: true,
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

async function countTenantsWithBail(req, res) {
  try {
    // Utilisez Prisma pour compter les locataires qui ont des baux
    const count = await TenantsModel.count({
      where: {
        bails: {
          some: {}, // Filtre les locataires ayant au moins un bail
        },
      },
    });

    return res.json({ count: count });
  } catch (error) {
    console.error("Erreur lors du comptage des locataires avec bails:", error);
    throw error;
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
      data: {
        name: newTenant.name,
        prenom: newTenant.prenom,
        adress: "",
        email: newTenant.email,
        telephone: newTenant.telephone,
        lessorId: newTenant.lessorId,
      },
      include: {
        payements: true,
        bails: true,
      },
    });

    const newUser = await userModel.create({
      data: {
        username: `${newTenant.name}.${newTenant.prenom}`,
        password: await bcrypt.hash("122334450", 10),
        email: newTenant.email,
        role: "tenant",
      },
    });

    return res.status(200).json({ tenantAdded: tenantAdded, newUser: newUser });
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
  try {
    const { tenantId } = req.params;
    const foundtenant = await TenantsModel.findUnique({
      where: { id: +tenantId },
    });

    if (foundtenant) {
      const user = await userModel.delete({
        where: {
          email: foundtenant.email,
        },
      });
      const tenant = await TenantsModel.delete({
        where: { id: +tenantId },
      });

      return res
        .status(202)
        .send({ tenant: tenant, user: user, message: "Delete succefull" });
    } else {
      console.log("error suppression tenant");
    }
  } catch (error) {
    console.log(error.message);
    console.log("error lors de la suppression: ", error);
    return res.status(500).send(error.message);
  }
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
  countTenantsWithBail,
};
