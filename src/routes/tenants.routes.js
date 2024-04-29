const passport = require("passport");
const { Router } = require("express");
const {
  createTenant,
  deleteAllTenants,
  deleteTenant,
  getAllTenants,
  getOneTenant,
  updateTenant,
} = require("../controllers/tenantController.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const tenantRouter = Router();

//Get all tenants
tenantRouter.get(`/`, getAllTenants);

//Get one tweet by tenantId
tenantRouter.get(`/:houseId`, getOneTenant);

//Create a new tenant
tenantRouter.post(`/add`, createTenant);

//Update house by tenantId
tenantRouter.put(`/update/:tenantId`, updateTenant);

//Delete house by tenantId
tenantRouter.delete(`/delete/:tenantId`, deleteTenant);

//Delete all tenants
tenantRouter.delete(`/delete`, deleteAllTenants);

module.exports = tenantRouter;
