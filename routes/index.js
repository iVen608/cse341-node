const express = require("express");
const route = express.Router();
const controller = require('../controllers/contacts.js');

route.get("/contacts/", controller.displayContact);
route.get("/", controller.homeView);
module.exports = route;