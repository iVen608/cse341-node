const express = require("express");
const route = express.Router();

route.get("/", function(req, res) {
    res.send("Marcus Stark");
});

module.exports = route;