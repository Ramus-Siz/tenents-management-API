const passport = require("passport");
const { Router } = require("express");
const {
  createBail,
  deleteAllBails,
  deleteBail,
  getAllBails,
  getOneBail,
  updateBail,
  getBailByTenantId,
} = require("../controllers/bailController.js");
const auth = require("../middleware/auth.js");
const isTenant = require("../middleware/isTenant.js");
const isTenantOrLessor = require("../middleware/isTenantOrLessor.js");
const isLessor = require("../middleware/isLessor.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const bailRouter = Router();

//Get all houses
bailRouter.get(`/`, [auth, isLessor], getAllBails);

//Get one tweet by bailId
bailRouter.get(`/:bailId`, [auth, isTenantOrLessor], getOneBail);
bailRouter.get(`/bytenant/:tenantId`, getBailByTenantId);

//Create a new bail
bailRouter.post(`/add`, [auth, isLessor], createBail);

//Update house by houseID
bailRouter.put(`/update/:bailId`, [auth, isTenantOrLessor], updateBail);

//Delete house by houseID
bailRouter.delete(`/delete/:bailId`, [auth, isLessor], deleteBail);

//Delete all houses
bailRouter.delete(`/delete`, [auth, isLessor], deleteAllBails);

module.exports = bailRouter;
