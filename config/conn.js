const mongoose = require("mongoose")

exports.connectToMongo =()=>{
    mongoose.connect("mongodb+srv://Hiran:Hiran@foodapp.v900lm1.mongodb.net/Food?retryWrites=true&w=majority").then(()=>{
        console.log("Successfully connected to db atlas ");
    }).catch((err)=>{
        console.log("Connection to mongodb failed");
    })
}

 