const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017"


const connectToMongo = () => {
    mongoose.connect(URL).then(()=> console.log("Connected TO Database")).catch((err)=>console.log(err))
}

module.exports = connectToMongo;