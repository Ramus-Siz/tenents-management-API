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
  countTenantsWithBail,
} = require("../controllers/tenantController.js");
const auth = require("../middleware/auth.js");
const isLessor = require("../middleware/isLessor.js");
const isTenantOrLessor = require("../middleware/isTenantOrLessor.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const tenantRouter = Router();

//Get all tenants
tenantRouter.get(`/`, getAllTenants);

//Get one tenant by tenantId
tenantRouter.get(`/:tenantId`, [auth], getOneTenant);
tenantRouter.get(`/lessor/:lessorId`, getAllTenantsByLessorId);
tenantRouter.get(`/count/count-tenants-with-bail`, countTenantsWithBail);

countTenantsWithBail;
//Create a new tenant
tenantRouter.post(`/add`, [auth], createTenant);

//Update tenant by tenantId
tenantRouter.put(`/update/:tenantId`, [auth], updateTenant);

//Delete house by tenantId
tenantRouter.delete(`/delete/:tenantId`, [auth, isLessor], deleteTenant);

//Delete all tenants
tenantRouter.delete(`/delete`, [auth], deleteAllTenants);

module.exports = tenantRouter;
