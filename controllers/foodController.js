
const foodModel = require("../model/foodSchema")

exports.createFood = async (req, res) => {
   const file = req.file.filename;
   const { foodName,
      restaurantName,
      foodDescription,
      price } = req.body;

   if (!foodName || !restaurantName || !foodDescription || !price) {
      res.status(401).json({
         message: "Please fill all the fields"
      })
   }
   try {
      const newData = new foodModel({
         foodName, restaurantName, foodDescription, price, foodImg: file
      })
      await newData.save();
      res.status(201).json({
         message: "Product created",
         newData
      })
   } catch (error) {
      res.status(404).json({
         message: error
      })
   }
   
}
exports.getFood = async (req, res) => {
   const food = await foodModel.find()
   res.status(200).json({
      success: true,
      food
   })
}