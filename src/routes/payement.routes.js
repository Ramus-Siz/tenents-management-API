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
const isLessor = require("../middleware/isLessor.js");
const isAdmin = require("../middleware/isAdmin.js");
const isTenantOrLessor = require("../middleware/isTenantOrLessor.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const payementRouter = Router();

//Get all payement
payementRouter.get(`/`, [auth], isLessor);

//Get one payement by payementId
payementRouter.get(`/:payId`, [auth, isTenantOrLessor], getOnePayement);
payementRouter.get(
  `/bytenant/:tenantId`,
  [auth, isTenantOrLessor],
  getPayementByTenantId
);

//Create a new payement
payementRouter.post(`/add`, [auth, isLessor], createPayement);

//Update house by payementId
payementRouter.put(`/update/:payId`, [auth, isLessor], updatePayement);

//Delete payement by payementId
payementRouter.delete(`/delete/:payId`, [auth, isLessor], deletePayement);

//Delete all payements
payementRouter.delete(`/delete`, deleteAllPayement);

module.exports = payementRouter;
