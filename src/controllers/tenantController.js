// const { PrismaClient } = require("@prisma/client");
// const { UserModel, TweetsModel } = new PrismaClient();

/*
--------------------------
Retrieve one user from 
the database.
--------------------------
*/
async function getOneTenant(req, res) {
  return res.send("one tenant");
}

/*
--------------------------
Retrieve all tenant from 
the database.
--------------------------
*/
async function getAllTenants(req, res) {
  return res.send("all tenants true");
}

/*
--------------------------
Create and save a new tenant
in the database
--------------------------
*/
async function createTenant(req, res) {
  return res.send("tenant is created");
}

/*
--------------------------
Update a tenant by the id 
in the request
--------------------------
*/
async function updateTenant(req, res) {
  return res.send("tenant is updated");
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
};
