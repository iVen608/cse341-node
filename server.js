const express = require("express");
const app = express();
const destination = require("./routes/index.js")

app.use("/", destination);


app.listen(3000);