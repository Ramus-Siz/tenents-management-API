const passport = require("passport");
const { Router } = require("express");
const {
  createTenant,
  deleteAllTenants,
  deleteTenant,
  getAllTenants,
  getOneTenant,
  updateTenant,
  getAllTenantsByLessorId,
} = require("../controllers/tenantController.js");
const auth = require("../middleware/auth.js");
const isLessor = require("../middleware/isLessor.js");
const isTenantOrLessor = require("../middleware/isTenantOrLessor.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const tenantRouter = Router();

//Get all tenants
tenantRouter.get(`/`, getAllTenants);

//Get one tenant by tenantId
tenantRouter.get(`/:tenantId`, [auth, isTenantOrLessor], getOneTenant);
tenantRouter.get(`/lessor/:lessorId`, [auth], getAllTenantsByLessorId);

//Create a new tenant
tenantRouter.post(`/add`, [auth], createTenant);

//Update tenant by tenantId
tenantRouter.put(`/update/:tenantId`, [auth], updateTenant);

//Delete house by tenantId
tenantRouter.delete(`/delete/:tenantId`, [auth], deleteTenant);

//Delete all tenants
tenantRouter.delete(`/delete`, [auth], deleteAllTenants);

module.exports = tenantRouter;
