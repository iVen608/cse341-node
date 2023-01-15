const express = require("express");
const app = express();
const destination = require("./routes/")
const mongodb = require('./db/connect.js');
const port = process.env.PORT || 3000;

app.use("/", destination);

const callback = (error) => {
    if(error){
        console.log(`There was an error: ${error}`);
    } else {
        app.listen(port);
    }
}

mongodb.initDb(callback);