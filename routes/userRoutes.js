const express = require("express");
const { createUser, getAllUser, getSingleUser, loginUser, updateUser, deleteUser, validateUser, logoutUser, uploadImage } = require("../controllers/userController");
const router = express.Router()
const authenticate = require("../middleware/auth");
// const upload = require("../middleware/imageUpload");

const multer = require("multer")
const upload = multer({dest:'uploads/'})

router.post("/user/register", createUser)
router.get("/user/get_user", getAllUser)
router.get("/user/get_single_user/:id", getSingleUser)
router.post("/user/login", loginUser)
router.patch("/user/update/user/:id", updateUser)
router.delete("/user/delete/user/:id", deleteUser)
router.get("/user/validate_user", authenticate, validateUser)
router.get("/user/logout_user", authenticate, logoutUser)
router.put("/user/image_upload/:id", authenticate,upload.single('image'),uploadImage)

module.exports = router;