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
} = require("../controllers/houseController.js");
const auth = require("../middleware/auth.js");
// const { isAdmin, isAuthentificated } = require("../utils/middleware.js");

const houseRouter = Router();

//Get all houses
houseRouter.get(`/`, [auth], getAllHouses);

//Get one tweet by houseId
houseRouter.get(`/:houseId`, [auth], getOneHouse);
houseRouter.get(`/lessor/:lessorId`, [auth], getAllHousesByHandle);

//Create a new house
houseRouter.post(`/add`, [auth], createHouse);

//Update house by houseID
houseRouter.put(`/update/:houseId`, [auth], updateHouse);

//Delete house by houseID
houseRouter.delete(`/delete/:houseId`, [auth], deleteHouse);

//Delete all houses
houseRouter.delete(`/delete`, [auth], deleteAllHouses);

module.exports = houseRouter;
