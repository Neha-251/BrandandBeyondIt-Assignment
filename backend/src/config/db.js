const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb+srv://neha:neha@cluster0.dtbqqoy.mongodb.net/?retryWrites=true&w=majority").then(console.log("connected"))
}

module.exports = connect;