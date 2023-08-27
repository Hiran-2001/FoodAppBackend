const express = require("express");
const { createUser, getAllUser, getSingleUser, loginUser, updateUser, deleteUser, validateUser, logoutUser, uploadImage } = require("../controllers/userController");
const router = express.Router()
const authenticate = require("../middleware/auth");
// const upload = require("../middleware/imageUpload");

const multer = require("multer")
const upload = multer({dest:'uploads/'})

router.post("/register", createUser)
router.get("/get_user", getAllUser)
router.get("/get_single_user/:id", getSingleUser)
router.post("/login", loginUser)
router.patch("/update/user/:id", updateUser)
router.delete("/delete/user/:id", deleteUser)
router.get("/validate_user", authenticate, validateUser)
router.get("/logout_user", authenticate, logoutUser)
router.put("/image_upload/:id", authenticate,upload.single('image'),uploadImage)

module.exports = router;