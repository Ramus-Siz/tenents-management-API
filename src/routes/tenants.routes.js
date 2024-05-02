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
const isLessor = require("../middleware/isLessor.js");
const isTenantOrLessor = require("../middleware/isTenantOrLessor.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const tenantRouter = Router();

//Get all tenants
tenantRouter.get(`/`, [auth, isLessor], getAllTenants);

//Get one tenant by tenantId
tenantRouter.get(`/:tenantId`, [auth, isTenantOrLessor], getOneTenant);

//Create a new tenant
tenantRouter.post(`/add`, [auth, isLessor], createTenant);

//Update tenant by tenantId
tenantRouter.put(`/update/:tenantId`, [auth, isLessor], updateTenant);

//Delete house by tenantId
tenantRouter.delete(`/delete/:tenantId`, [auth, isLessor], deleteTenant);

//Delete all tenants
tenantRouter.delete(`/delete`, [auth], deleteAllTenants);

module.exports = tenantRouter;
