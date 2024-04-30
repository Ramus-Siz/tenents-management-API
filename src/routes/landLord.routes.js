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
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const landLordRouter = Router();

//Get all landlord
landLordRouter.get(`/`, getAllLandLord);

//Get one tweet by landlordId
landLordRouter.get(`/:landlordId`, getOneLandLord);

//Create a new landlord
landLordRouter.post(`/add`, createLandLord);

//Update house by landlordId
landLordRouter.put(`/update/:landlordId`, updateLandLord);

//Delete house by landlordId
landLordRouter.delete(`/delete/:landlordId`, deleteLandLord);

//Delete all landlords
landLordRouter.delete(`/delete`, deleteAllLandLord);

module.exports = landLordRouter;
