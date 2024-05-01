const passport = require("passport");
const { Router } = require("express");
const {
  createLandLord,
  deleteAllLandLord,
  deleteLandLord,
  getAllLandLord,
  getOneLandLord,
  updateLandLord,
} = require("../controllers/landLordController.js");
const auth = require("../middleware/auth.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const landLordRouter = Router();

//Get all landlord
landLordRouter.get(`/`, [auth], getAllLandLord);

//Get one tweet by landlordId
landLordRouter.get(`/:landlordId`, [auth], getOneLandLord);

//Create a new landlord
landLordRouter.post(`/add`, [auth], createLandLord);

//Update house by landlordId
landLordRouter.put(`/update/:landlordId`, [auth], updateLandLord);

//Delete house by landlordId
landLordRouter.delete(`/delete/:landlordId`, [auth], deleteLandLord);

//Delete all landlords
landLordRouter.delete(`/delete`, [auth], deleteAllLandLord);

module.exports = landLordRouter;
