const express = require("express");
const route = express.Router();
const controller = require('../controllers/');

route.get("/contacts/", controller.testingFunction);
route.get("/", controller.homeView);
module.exports = route;