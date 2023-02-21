const express = require("express");
const route = express.Router();
const passport = require('passport');
const controller = require('../controllers/town.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerTown.json');

route.get("/towns/", controller.displayTowns);
route.get("/inventory/", controller.displayInventory);
route.post("/towns/addTown/", controller.addTown);
route.put("/towns/updateTown/", controller.updateTown);
route.delete("/towns/deleteTown/", controller.deleteTown);
route.get('/google', passport.authenticate('google'));
/*route.get('/google/redirect', (req, res) => {
    res.send("Logged in "  + req.query.code + "\n" + req.user);
})*/
route.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/inventory'
}), (req, res) => {
    req.login(req.user, () => console.log("callback"))
    console.log(req.user);
    res.send("Logged in "  + req.query.code + "\n" + req.user);
})
route.get('/protected', passport.authenticate('google'), (req, res) => {
    console.log(req.user);
    res.send("Logged in "  + req.query.code + "\n" + req.user);
})

route.post('/logout', (req, res) => {
    req.logout(()=>console.log('logging out'))
    res.redirect('/')   
})
route.use('/api-docs', swaggerUi.serve);
route.get('/api-docs', swaggerUi.setup(swaggerDocument));
module.exports = route;