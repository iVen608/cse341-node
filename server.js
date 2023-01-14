const express = require("express");
const app = express();
const destination = require("./routes/")
const mongodb = require('./db/connect.js');
const port = process.env.PORT || 3000;

app.use("/", destination);

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Server is running on port ${port}`);
    }
  });