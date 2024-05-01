const passport = require("passport");
const { Router } = require("express");
const {
  createPayement,
  deleteAllPayement,
  deletePayement,
  getAllPayement,
  getOnePayement,
  updatePayement,
  getPayementByTenantId,
} = require("../controllers/payementController.js");
const auth = require("../middleware/auth.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const payementRouter = Router();

//Get all houses
payementRouter.get(`/`, [auth], getAllPayement);

//Get one tweet by bailId
payementRouter.get(`/:payId`, [auth], getOnePayement);
payementRouter.get(`/bytenant/:tenantId`, [auth], getPayementByTenantId);

//Create a new bail
payementRouter.post(`/add`, [auth], createPayement);

//Update house by houseID
payementRouter.put(`/update/:payId`, [auth], updatePayement);

//Delete house by houseID
payementRouter.delete(`/delete/:payId`, deletePayement);

//Delete all houses
payementRouter.delete(`/delete`, deleteAllPayement);

module.exports = payementRouter;
