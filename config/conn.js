const mongoose = require("mongoose")

exports.connectToMongo =()=>{
    mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
        console.log("Successfully connected to db atlas ");
    }).catch((err)=>{
        console.log("Connection failed");
    })
}

