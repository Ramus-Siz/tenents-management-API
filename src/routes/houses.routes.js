const passport = require("passport");
const { Router } = require("express");
const {
  createHouse,
  deleteAllHouses,
  deleteHouse,
  getAllHousesByHandle,
  getAllHouses,
  getOneHouse,
  updateHouse,
  getAllHousesByLessorId,
} = require("../controllers/houseController.js");
const auth = require("../middleware/auth.js");
const isLessor = require("../middleware/isLessor.js");
const isTenantOrLessor = require("../middleware/isTenantOrLessor.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const houseRouter = Router();

//Get all houses
houseRouter.get(`/`, [auth, isLessor], getAllHouses);

//Get one tweet by houseId
houseRouter.get(`/:houseId`, [auth, isTenantOrLessor], getOneHouse);
houseRouter.get(`/lessor/:lessorId`, [auth], getAllHousesByLessorId);

//Create a new house
houseRouter.post(`/add`, [auth, isLessor], createHouse);

//Update house by houseID
houseRouter.put(`/update/:houseId`, [auth, isLessor], updateHouse);

//Delete house by houseID
houseRouter.delete(`/delete/:houseId`, [auth, isLessor], deleteHouse);

//Delete all houses
houseRouter.delete(`/delete`, [auth, isLessor], deleteAllHouses);

module.exports = houseRouter;
