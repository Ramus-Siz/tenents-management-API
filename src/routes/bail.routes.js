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
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const bailRouter = Router();

//Get all houses
bailRouter.get(`/`, [auth], getAllBails);

//Get one tweet by bailId
bailRouter.get(`/:bailId`, getOneBail);
bailRouter.get(`/bytenant/:tenantId`, getBailByTenantId);

//Create a new bail
bailRouter.post(`/add`, [auth], createBail);

//Update house by houseID
bailRouter.put(`/update/:bailId`, [auth], updateBail);

//Delete house by houseID
bailRouter.delete(`/delete/:bailId`, [auth], deleteBail);

//Delete all houses
bailRouter.delete(`/delete`, [auth], deleteAllBails);

module.exports = bailRouter;
