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
const auth = require("../middleware/auth.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const tenantRouter = Router();

//Get all tenants
tenantRouter.get(`/`, [auth], getAllTenants);

//Get one tweet by tenantId
tenantRouter.get(`/:tenantId`, [auth], getOneTenant);

//Create a new tenant
tenantRouter.post(`/add`, [auth], createTenant);

//Update house by tenantId
tenantRouter.put(`/update/:tenantId`, [auth], updateTenant);

//Delete house by tenantId
tenantRouter.delete(`/delete/:tenantId`, [auth], deleteTenant);

//Delete all tenants
tenantRouter.delete(`/delete`, [auth], deleteAllTenants);

module.exports = tenantRouter;
