const express = require("express")
const { createFood, getFood } = require("../controllers/foodController")
const upload = require("../utils/multer")
const checkRole = require("../middleware/roles")
const authenticate = require("../middleware/auth")
const router = express.Router()


router.post("/food/add", authenticate, checkRole, upload.single("Food-image"),createFood)
router.get("/food",getFood)

module.exports = router; 