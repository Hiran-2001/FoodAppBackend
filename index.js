const express = require("express");
const { connectToMongo } = require("./config/conn");
const foodRoute = require("./routes/foodRoutes");
const userRoute = require("./routes/userRoutes");
const app = express()
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 4000;
const cors = require("cors")
require("dotenv").config()

console.log(process.env.MONGO_DB_URL);

connectToMongo()
app.use(express.json())
// console.log(process.env.JWT_SECRET_KEY);
app.use(cookieParser())
app.use(cors())
app.use('/', foodRoute)
app.use('/', userRoute)
app.use("/uploads", express.static("./uploads"))
//  app.get('/cookie',(req,res)=>{
//     // console.log(req.cookies);
//     res.send("hello")
//  }) 


if(process.env.NODE_ENV=== "production"){
    app.use(express.static("client/build"))
}

app.listen(port, console.log(`server started at ${port}`))