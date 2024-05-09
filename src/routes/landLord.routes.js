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
const isAdmin = require("../middleware/isAdmin.js");
const isLessor = require("../middleware/isLessor.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const landLordRouter = Router();

//Get all landlord
landLordRouter.get(`/`, [auth], getAllLandLord);

//Get one Landlord by landlordId
landLordRouter.get(`/:landlordId`, [auth, isLessor], getOneLandLord);

//Create a new landlord
landLordRouter.post(`/add`, createLandLord);

//Update landlord by landlordId
landLordRouter.put(`/update/:landlordId`, [auth, isLessor], updateLandLord);

//Delete landlord by landlordId
landLordRouter.delete(`/delete/:landlordId`, [auth, isLessor], deleteLandLord);

//Delete all landlords
landLordRouter.delete(`/delete`, [auth, isAdmin], deleteAllLandLord);

module.exports = landLordRouter;
