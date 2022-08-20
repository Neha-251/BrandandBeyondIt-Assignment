const express = require("express");
const app = express();
const cors = require("cors")

const userController = require("./controller/user.controller");


app.use(express.json());
app.use(cors());

app.get("/", (req, res)=> {
    res.send("welcome")
})


app.use("/users", userController);


module.exports = app;