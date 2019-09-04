const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const apiRouter = require("./routers/api");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/hotgirl-23", (err)=> {
    if (err) console.log(err)
    else console.log("DB connect success!!!");
});

app.use("/api", apiRouter);

app.listen(process.env.PORT || 6969, (err)=> {
    if(err) console.log(err)
    else console.log("Server start success!!!");
});