const express = require("express");
const route = express.Router();
const controller = require('../controllers/town.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerTown.json');

route.get("/towns/", controller.displayTowns);
route.get("/inventory/", controller.displayInventory);
route.post("/towns/addTown/", controller.addTown);
/*route.get("/contacts/update/", controller.updateContactView);
route.put("/contacts/updateContact/", controller.updateContact);
route.delete("/contacts/delete/", controller.deleteContact);*/

route.use('/api-docs', swaggerUi.serve);
route.get('/api-docs', swaggerUi.setup(swaggerDocument));
module.exports = route;