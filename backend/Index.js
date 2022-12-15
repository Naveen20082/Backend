const express = require("express");
const app = express();
const connectToMongo = require("./db");

connectToMongo();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT  = process.env.PORT ||  8000;

const validator = require("validator");

app.use("/", require("./users"));

app.listen(PORT , ()=>{
    console.log(`Application Running at port : ${PORT}`)
})