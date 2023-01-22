const express = require("express");
const route = express.Router();
const controller = require('../controllers/contacts.js');

route.get("/contacts/", controller.displayContact);
route.get("/", controller.homeView);
route.get("/contacts/add/", controller.addContactView);
route.post("/contacts/addContact/", controller.addContact);
route.get("/contacts/update/", controller.updateContactView);
route.put("/contacts/updateContact/", controller.updateContact);
route.delete("/contacts/delete/", controller.deleteContact);
module.exports = route;